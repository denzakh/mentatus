#!/usr/bin/env node
/*
Отчёт «определено / используется» для CSS-классов.

Что делает:
1. проходит JS/JSX-файлы в src, вытаскивает строковые литералы и токены,
   похожие на CSS-классы (включая аргументы classNames(...));
2. проходит CSS-файлы в src и собирает все селекторы классов (.foo);
3. печатает `defined - used` и `used - defined`.

Отчёт — основа для ручной проверки, а не автоудаление: часть классов
собирается динамически (`className={itemClassName}`), поэтому строковые
литералы могут не найти все варианты использования.

Запуск: node scripts/find-unused-css.js
*/

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

const JS_EXTENSIONS = [".js", ".jsx"];
const CSS_EXTENSION = ".css";

// класс: буква, затем буквы/цифры/дефис/подчёркивание
const CLASS_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

function walk(dir, extensions, result = []) {
  fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, extensions, result);
      } else if (extensions.indexOf(path.extname(entry.name)) !== -1) {
        result.push(fullPath);
      }
    });

  return result;
}

function relative(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

/* Заменяет комментарии пробелами, не трогая строки, и сохраняет позиции:
   offsets и номера строк остаются такими же, как в исходнике. */
function maskComments(code) {
  let result = "";
  let state = "code";
  let quote = "";

  for (let i = 0; i < code.length; i += 1) {
    const char = code[i];
    const next = code[i + 1];

    if (state === "code") {
      if (char === "/" && next === "/") {
        result += "  ";
        state = "line-comment";
        i += 1;
      } else if (char === "/" && next === "*") {
        result += "  ";
        state = "block-comment";
        i += 1;
      } else {
        result += char;

        if (char === '"' || char === "'" || char === "`") {
          quote = char;
          state = "string";
        }
      }
    } else if (state === "line-comment") {
      result += char === "\n" ? char : " ";

      if (char === "\n") {
        state = "code";
      }
    } else if (state === "block-comment") {
      result += char === "\n" ? char : " ";

      if (char === "*" && next === "/") {
        result += " ";
        state = "code";
        i += 1;
      }
    } else if (state === "string") {
      result += char;

      if (char === "\\") {
        result += next || "";
        i += 1;
      } else if (char === quote) {
        state = "code";
      }
    }
  }

  return result;
}

/* Строковые литералы в уже замаскированном коде: { value, start, end }. */
function collectStrings(code) {
  const strings = [];
  let state = "code";
  let quote = "";
  let start = 0;
  let current = "";

  for (let i = 0; i < code.length; i += 1) {
    const char = code[i];

    if (state === "code") {
      if (char === '"' || char === "'" || char === "`") {
        quote = char;
        start = i;
        current = "";
        state = "string";
      }
    } else if (char === "\\") {
      current += char + (code[i + 1] || "");
      i += 1;
    } else if (char === quote) {
      strings.push({ value: current, start, end: i + 1 });
      state = "code";
    } else {
      current += char;
    }
  }

  return strings;
}

// позиция в тексте принадлежит одному из интервалов
function inSpans(position, spans) {
  return spans.some(span => position >= span.start && position < span.end);
}

/* Интервалы значений className/itemClassName/labelClassName:
   className="foo", className={"foo"} и className={cond ? "a" : "b"} */
function classNameSpans(clean, strings) {
  const spans = [];
  const stringRanges = strings.map(s => ({ start: s.start, end: s.end }));
  const attrRe = /\b(?:className|itemClassName|labelClassName)\s*[=:]\s*/g;
  let match = attrRe.exec(clean);

  while (match) {
    let index = match.index + match[0].length;

    while (/\s/.test(clean[index] || "")) {
      index += 1;
    }

    if (clean[index] === "{") {
      let depth = 0;
      let cursor = index;

      while (cursor < clean.length) {
        if (inSpans(cursor, stringRanges)) {
          cursor += 1;
          continue;
        }

        if (clean[cursor] === "{") {
          depth += 1;
        } else if (clean[cursor] === "}") {
          depth -= 1;

          if (depth === 0) {
            cursor += 1;
            break;
          }
        }

        cursor += 1;
      }

      spans.push({ start: match.index, end: cursor });
    } else {
      // className="foo" — интервал до конца строки, литерал внутри
      const lineEnd = clean.indexOf("\n", index);
      spans.push({
        start: match.index,
        end: lineEnd === -1 ? clean.length : lineEnd
      });
    }

    match = attrRe.exec(clean);
  }

  return spans;
}

/* Интервалы вызовов classNames(...) — их аргументы это классы. */
function classNamesSpans(clean, strings) {
  const spans = [];
  const callRe = /\bclassNames\s*\(/g;
  const stringRanges = strings.map(s => ({ start: s.start, end: s.end }));
  let match = callRe.exec(clean);

  while (match) {
    let depth = 0;
    let cursor = match.index + match[0].length - 1;

    while (cursor < clean.length) {
      if (inSpans(cursor, stringRanges)) {
        cursor += 1;
        continue;
      }

      if (clean[cursor] === "(") {
        depth += 1;
      } else if (clean[cursor] === ")") {
        depth -= 1;

        if (depth === 0) {
          cursor += 1;
          break;
        }
      }

      cursor += 1;
    }

    spans.push({ start: match.index, end: cursor });
    match = callRe.exec(clean);
  }

  return spans;
}

function classTokens(value) {
  return value
    .split(/\s+/)
    .map(token => token.trim())
    .filter(token => CLASS_RE.test(token));
}

/* Возвращает { strong, weak }: strong — использования в атрибутах/вызовах
   классов, weak — любые прочие строки, похожие на класс. */
function collectUsedClasses(files) {
  const strong = new Map();
  const weak = new Map();

  const add = (map, token, file) => {
    if (!map.has(token)) {
      map.set(token, []);
    }

    const files = map.get(token);
    if (files.indexOf(file) === -1) {
      files.push(file);
    }
  };

  files.forEach(file => {
    const source = fs.readFileSync(file, "utf8");
    const clean = maskComments(source);
    const strings = collectStrings(clean);
    const spans = classNameSpans(clean, strings).concat(
      classNamesSpans(clean, strings)
    );

    strings.forEach(item => {
      const map = inSpans(item.start, spans) ? strong : weak;

      classTokens(item.value).forEach(token => add(map, token, file));
    });
  });

  return { strong, weak };
}

// заменяет комментарии пробелами, сохраняя переводы строк и позиции
function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, comment =>
    comment.replace(/[^\n]/g, " ")
  );
}

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

function collectDefinedClasses(files) {
  const defined = new Map();

  files.forEach(file => {
    const css = stripCssComments(fs.readFileSync(file, "utf8"));

    // текст перед каждой { — селектор (в т.ч. вложенный в @media)
    const selectorRe = /([^{}]+)\{/g;
    let match = selectorRe.exec(css);

    while (match) {
      const selector = match[1].trim();

      if (selector && selector[0] !== "@") {
        const classRe = /\.([_a-zA-Z][\w-]*)/g;
        let classMatch = classRe.exec(selector);

        while (classMatch) {
          const token = classMatch[1];

          if (!defined.has(token)) {
            defined.set(token, []);
          }

          defined.get(token).push({
            file,
            line: lineOf(css, match.index + classMatch.index)
          });

          classMatch = classRe.exec(selector);
        }
      }

      match = selectorRe.exec(css);
    }
  });

  return defined;
}

/* Правила без объявлений (после удаления комментариев) — мёртвый CSS. */
function collectEmptyRules(files) {
  const rules = [];

  files.forEach(file => {
    const css = stripCssComments(fs.readFileSync(file, "utf8"));
    const selectorRe = /([^{}]+)\{/g;
    let match = selectorRe.exec(css);

    while (match) {
      const selector = match[1].trim().replace(/\s+/g, " ");

      if (selector && selector[0] !== "@") {
        const bodyStart = match.index + match[0].length;
        const bodyEnd = css.indexOf("}", bodyStart);

        if (bodyEnd !== -1 && css.slice(bodyStart, bodyEnd).trim() === "") {
          rules.push({
            file,
            line: lineOf(css, match.index),
            selector
          });
        }
      }

      match = selectorRe.exec(css);
    }
  });

  return rules;
}

function printSection(title, items) {
  console.log("");
  console.log(`--- ${title} (${items.length}) ---`);

  if (!items.length) {
    console.log("нет");
    return;
  }

  items.forEach(item => console.log(item));
}

function main() {
  const jsFiles = walk(SRC, JS_EXTENSIONS);
  const cssFiles = walk(SRC, [CSS_EXTENSION]);

  const { strong, weak } = collectUsedClasses(jsFiles);
  const defined = collectDefinedClasses(cssFiles);
  const emptyRules = collectEmptyRules(cssFiles);

  const unusedDefined = [...defined.keys()]
    .filter(token => !strong.has(token))
    .sort();

  const duplicates = [...defined.entries()]
    .filter(([, places]) => new Set(places.map(place => place.file)).size > 1)
    .sort((a, b) => a[0].localeCompare(b[0]));

  const undefinedStrong = [...strong.keys()]
    .filter(token => !defined.has(token))
    .sort();

  const undefinedWeak = [...weak.keys()]
    .filter(token => !defined.has(token) && !strong.has(token))
    .sort();

  // BEM-подобные токены среди «просто строк» — вероятные динамические классы
  const weakBem = undefinedWeak.filter(token => /__|--/.test(token));
  const weakOther = undefinedWeak.filter(token => !/__|--/.test(token));

  console.log("=== Отчёт по CSS-классам ===");
  console.log(`JS/JSX файлов: ${jsFiles.length}`);
  console.log(`CSS файлов: ${cssFiles.length}`);
  console.log(`Определено классов: ${defined.size}`);
  console.log(`Используется в className/classNames: ${strong.size}`);

  printSection(
    "Определено, но не используется в className/classNames",
    unusedDefined.map(token => {
      const places = defined
        .get(token)
        .map(place => `${relative(place.file)}:${place.line}`)
        .join(", ");
      const weakPlaces = weak.has(token)
        ? `  (встречается строкой: ${weak
            .get(token)
            .map(relative)
            .join(", ")})`
        : "";

      return `.${token}  ->  ${places}${weakPlaces}`;
    })
  );

  printSection(
    "Используется в className/classNames, но не определено",
    undefinedStrong.map(
      token =>
        `.${token}  <-  ${strong
          .get(token)
          .map(relative)
          .join(", ")}`
    )
  );

  printSection(
    "Прочие строки с BEM-разделителем (не определены, требуют проверки)",
    weakBem.map(
      token =>
        `.${token}  <-  ${weak
          .get(token)
          .map(relative)
          .join(", ")}`
    )
  );

  printSection(
    "Правила без объявлений",
    emptyRules.map(
      rule => `${relative(rule.file)}:${rule.line}  ${rule.selector}`
    )
  );

  printSection(
    "Класс определён в нескольких файлах (проверить каскад)",
    duplicates.map(([token, places]) => {
      const files = [...new Set(places.map(place => relative(place.file)))];

      return `.${token}  ->  ${files.join(", ")}`;
    })
  );

  console.log("");
  console.log(
    `Прочих токенов (имена полей, импорты и т.п.), не похожих на классы: ${weakOther.length}`
  );
}

main();
