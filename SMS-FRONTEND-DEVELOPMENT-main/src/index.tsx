import React from "react";
import ReactDOM from "react-dom";
// redux
import { Provider } from "react-redux";
import {store,persistor} from "redux/store";
import { PersistGate } from "redux-persist/integration/react";

// components
import App from "./App/App";

// style
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);