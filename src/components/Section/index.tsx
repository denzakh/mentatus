import type { ComponentType, ReactNode } from "react";
import { shallowEqual } from "react-redux";
import { collectVisibility, blockKey } from "../../lib/layout";
import { useAppSelector } from "../../lib/redux";
import Field from "../Field";
import Group from "../Group";
import type { Layout, LayoutBlock } from "../../types/layout";
import type { Schema } from "../../types/schema";
import type { SectionName } from "../../types/status";

/*
Section
рендер формы раздела по декларативному layout (см. `src/store/*Layout.js`)

принимает:
section    - имя среза стора (state[section])
dataBase   - схема раздела (*Data.js)
layout     - массив блоков раскладки
components - карта custom-блоков { имя: компонент }

Новые поля в layout добавляются без правки компонентов: тип берётся из схемы.
Условия видимости (`visibleWhen`) собираются в один объект и сравниваются
поверхностно (`shallowEqual`), поэтому раздел перерисовывается только при
изменении самих условий, а не на каждый ввод в поле.
*/

interface OwnProps {
  section: SectionName;
  dataBase: Schema;
  layout: Layout;
  components?: Record<string, ComponentType<{ dataBase?: Schema }>>;
}

// то, что нужно каждому блоку уровня: схема раздела, custom-блоки и видимость
interface BlocksContext {
  dataBase: Schema;
  components?: Record<string, ComponentType<{ dataBase?: Schema }>>;
  visible: Record<string, boolean>;
}

interface BlockProps extends BlocksContext {
  block: LayoutBlock;
  path: number[];
}

export default function Section(props: OwnProps) {
  const { section, dataBase, layout, components } = props;

  const visible = useAppSelector(
    state => collectVisibility(layout, state[section] || {}),
    shallowEqual
  );

  return (
    <div>{renderBlocks(layout, [], { dataBase, components, visible })}</div>
  );
}

// блоки одного уровня; ключ — путь индексов от корня layout
function renderBlocks(
  blocks: LayoutBlock[] | undefined,
  path: number[],
  context: BlocksContext
): ReactNode {
  return (blocks || []).map((block, index) => {
    const blockPath = path.concat(index);

    return (
      <SectionBlock
        key={blockKey(blockPath)}
        block={block}
        path={blockPath}
        {...context}
      />
    );
  });
}

function SectionBlock(props: BlockProps) {
  const { block, path, dataBase, components, visible } = props;
  const key = blockKey(path);
  const blockDataBase = block.dataBase || dataBase;

  if (block.visibleWhen && !visible[key]) {
    return null;
  }

  switch (block.type) {
    case "row":
    case "col":
    case "box":
      return (
        <div className={block.className}>
          {block.title ? (
            <div className="list__title">{block.title}</div>
          ) : null}
          {renderBlocks(block.blocks, path, { dataBase, components, visible })}
        </div>
      );

    case "title":
      return (
        <div className={block.className || "list__title"}>
          {block.label ? (
            <span className={block.labelClassName || "list__title-lable"}>
              {block.label}
            </span>
          ) : (
            block.text
          )}
          {renderBlocks(block.blocks, path, { dataBase, components, visible })}
        </div>
      );

    case "field":
      if (!block.name) {
        return null;
      }
      return (
        <Field
          name={block.name}
          dataBase={blockDataBase}
          component={block.component}
          label={block.label}
          style={block.style}
          autoKritika={block.autoKritika}
        />
      );

    case "group":
      return (
        <Group
          cicle={block.cicle}
          dataBase={blockDataBase}
          itemClassName={block.itemClassName}
          autoKritika={block.autoKritika}
        />
      );

    case "custom":
      return (
        <SectionCustom
          block={block}
          dataBase={blockDataBase}
          components={components}
        />
      );

    case "br":
      return <br />;

    default:
      return null;
  }
}

// нестандартный блок раздела (NachaloManager, OrientirovkaManager, ...)
function SectionCustom(props: {
  block: LayoutBlock;
  dataBase: Schema;
  components?: Record<string, ComponentType<{ dataBase?: Schema }>>;
}) {
  const { block, dataBase, components } = props;
  const Custom = block.component
    ? (components || {})[block.component]
    : undefined;

  if (!Custom) {
    return null;
  }

  return <Custom dataBase={dataBase} />;
}
