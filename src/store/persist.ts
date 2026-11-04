import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sections from "../reducers/sections";

/*
Персист состояния через redux-persist.

Сохраняем только предметные срезы разделов (`zhaloby`…`diagnoz`).
`option` (настройки UI: имя, активная вкладка) не персистим — при загрузке
он должен браться из начального состояния.

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
  // сохраняем только предметные срезы; `option` не сохраняем
  whitelist: Object.keys(sections),
  // при несовместимом изменении формы состояния поднять version и добавить migrate
  migrate: undefined
};

export default function withPersist(rootReducer) {
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
  } catch (e) {
    // localStorage может быть недоступен (приватный режим, запрет хранилища)
  }
}
