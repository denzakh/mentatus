
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./configureStore";

import ActivePage from "./components/ActivePage";
import Header from "./components/Header";

const { store, persistor } = configureStore();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="wrapper">
        <div className="wrapper__header">
          <Header />
        </div>
        <div className="wrapper__main">
          <ActivePage />
        </div>
      </div>
    </PersistGate>
  </Provider>
);
