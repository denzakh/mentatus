import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sections from "../reducers/sections";
import type { Reducer } from "redux";
import type { RootState } from "../reducers";

/*
Персист состояния через redux-persist.

Сохраняем только предметные срезы разделов (`zhaloby`…`diagnoz`) — других
срезов в сторе нет. Запись в localStorage троттлится (`throttle` в конфиге),
чтобы не сериализовать всё состояние на каждый символ при вводе.

redux-persist кладёт состояние в localStorage под ключом `persist:mentatus`.
*/
export const PERSIST_VERSION = 2;

export const PERSIST_KEY = "mentatus";

// ключ старого самописного формата: сырой JSON всего getState()
export const LEGACY_STORAGE_KEY = "mentatus:v2";

export const persistConfig = {
  key: PERSIST_KEY,
  version: PERSIST_VERSION,
  storage,
  // сохраняем только предметные срезы разделов
  whitelist: Object.keys(sections),
  // без throttle состояние сериализуется в localStorage на каждый экшен,
  // то есть на каждый символ при вводе в поле
  throttle: 300,
  // при несовместимом изменении формы состояния поднять version и добавить migrate
  migrate: undefined
};

export default function withPersist(rootReducer: Reducer<RootState>) {
  return persistReducer(persistConfig, rootReducer);
}

/*
Старые данные (до redux-persist) не подхватываем: они локальные и не критичны,
а формат отличается. Удаляем ключ, чтобы не копить мусор в localStorage.
*/
export function clearLegacyState() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // localStorage может быть недоступен (приватный режим, запрет хранилища)
  }
}
