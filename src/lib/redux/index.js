/* Вспомогательные функции для connect. */

// набор флагов isChecked для перечисленных полей стора
export function flagsOf(psystatus, keys) {
  const flags = {};
  keys.forEach(key => {
    flags[key] = !!(psystatus[key] && psystatus[key].isChecked);
  });
  return flags;
}

// поэлементное сравнение наборов флагов
export function areFlagsEqual(prev, next) {
  if (prev === next) {
    return true;
  }
  if (!prev || !next) {
    return false;
  }

  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  return prevKeys.every(key => prev[key] === next[key]);
}

/* Сравнение stateProps: примитивы — по значению, наборы флагов — поэлементно.
   Нужно, чтобы connect не перерисовывал список, если выбор пользователя не менялся. */
export function areStatePropsEqual(next, prev) {
  const nextKeys = Object.keys(next);

  if (nextKeys.length !== Object.keys(prev).length) {
    return false;
  }

  return nextKeys.every(key => {
    const nextValue = next[key];
    const prevValue = prev[key];

    if (nextValue === prevValue) {
      return true;
    }

    if (
      nextValue &&
      prevValue &&
      typeof nextValue === "object" &&
      typeof prevValue === "object"
    ) {
      return areFlagsEqual(prevValue, nextValue);
    }

    return false;
  });
}
