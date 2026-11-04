import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import withPersist, {
  persistConfig,
  clearLegacyState,
  LEGACY_STORAGE_KEY
} from "./persist";
import rootReducer from "../reducers";
import sections from "../reducers/sections";
import { setSymptom, setText } from "../actions/fieldActions";

describe("persistConfig", () => {
  it("персистит только срезы разделов", () => {
    expect(persistConfig.whitelist).toEqual(Object.keys(sections));
  });

  it("не персистит настройки UI (`option`)", () => {
    expect(persistConfig.whitelist).not.toContain("option");
  });

  it("задаёт ключ и версию схемы хранения", () => {
    expect(persistConfig.key).toBe("mentatus");
    expect(persistConfig.version).toBe(2);
    expect(`persist:${persistConfig.key}`).toBe("persist:mentatus");
  });
});

describe("withPersist", () => {
  it("оборачивает корневой редьюсер, сохраняя форму состояния", () => {
    const store = createStore(withPersist(rootReducer));
    const state = store.getState();

    Object.keys(sections).forEach(section => {
      expect(state[section]).toBeDefined();
    });
    expect(state.option.activePageName).toBe("Status");
  });

  it("пропускает экшены разделов через обёртку", () => {
    const store = createStore(withPersist(rootReducer));
    store.dispatch(setSymptom("zhalobyTrevoga"));

    expect(store.getState().zhaloby.zhalobyTrevoga.isChecked).toBe(true);
  });
});

describe("clearLegacyState", () => {
  const originalStorage = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  );

  const stubLocalStorage = value => {
    Object.defineProperty(window, "localStorage", {
      value,
      configurable: true,
      writable: true
    });
  };

  afterEach(() => {
    if (originalStorage) {
      Object.defineProperty(window, "localStorage", originalStorage);
    } else {
      delete window.localStorage;
    }
  });

  it("удаляет ключ старого самописного формата", () => {
    const removeItem = vi.fn();
    stubLocalStorage({ removeItem });

    clearLegacyState();

    expect(removeItem).toHaveBeenCalledWith(LEGACY_STORAGE_KEY);
    expect(LEGACY_STORAGE_KEY).toBe("mentatus:v2");
  });

  it("не падает, если localStorage запрещён", () => {
    stubLocalStorage({
      removeItem: () => {
        throw new Error("denied");
      }
    });

    expect(() => clearLegacyState()).not.toThrow();
  });
});

describe("persistStore", () => {
  const storageKey = `persist:${persistConfig.key}`;

  interface MemoryStorage {
    data: Record<string, string>;
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  }

  // хранилище с промис-API, как у адаптера localStorage из redux-persist
  const createMemoryStorage = (): MemoryStorage => {
    const data: Record<string, string> = {};
    return {
      data,
      getItem: key => Promise.resolve(key in data ? data[key] : null),
      setItem: (key, value) => {
        data[key] = value;
        return Promise.resolve();
      },
      removeItem: key => {
        delete data[key];
        return Promise.resolve();
      }
    };
  };

  const createPersistedStore = (storage: MemoryStorage) =>
    createStore(persistReducer({ ...persistConfig, storage }, rootReducer));

  const waitFor = (predicate: () => boolean) => {
    let attempts = 0;

    return new Promise<void>((resolve, reject) => {
      const tick = () => {
        if (predicate()) {
          resolve();
          return;
        }
        if (attempts >= 100) {
          reject(new Error("не дождались записи в storage"));
          return;
        }
        attempts += 1;
        setTimeout(tick, 10);
      };

      tick();
    });
  };

  const readSavedState = (
    storage: MemoryStorage
  ): Record<string, any> | null => {
    const raw = storage.data[storageKey];
    if (!raw) return null;

    // redux-persist сериализует каждый срез отдельной JSON-строкой
    const serializedSlices = JSON.parse(raw) as Record<string, string>;
    return Object.keys(serializedSlices).reduce(
      (state: Record<string, any>, slice) => {
        state[slice] = JSON.parse(serializedSlices[slice]);
        return state;
      },
      {}
    );
  };

  const rehydrate = (store: ReturnType<typeof createPersistedStore>) =>
    new Promise<void>(resolve => {
      persistStore(store, null, () => resolve());
    });

  it("сохраняет изменённые срезы и восстанавливает их", async () => {
    const storage = createMemoryStorage();
    const store = createPersistedStore(storage);

    await rehydrate(store);
    store.dispatch(setText("zhalobyText", "тревога"));

    const isWritten = () => {
      const saved = readSavedState(storage);
      return Boolean(
        saved && saved.zhaloby && saved.zhaloby.zhalobyText.text === "тревога"
      );
    };

    await waitFor(isWritten);

    const saved = readSavedState(storage);
    expect(saved).not.toBeNull();
    expect(saved!.zhaloby.zhalobyText.text).toBe("тревога");
    expect(saved!.option).toBeUndefined();

    // новый стор с тем же хранилищем должен подхватить значения
    const nextStore = createPersistedStore(storage);
    await rehydrate(nextStore);

    expect(nextStore.getState().zhaloby.zhalobyText.text).toBe("тревога");
    expect(nextStore.getState().option.activePageName).toBe("Status");
  });
});
