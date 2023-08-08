import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store/index.js";
import StoreContext from "./hoc/storeContext.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
);
