import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StoreProvider } from "easy-peasy";
import { store } from "./store/easyPeasyStore";
import { TokenProvider } from "./store/contextStore";

const storeType = import.meta.env.VITE_STORE_TYPE;

let Root = <App />;

if (storeType === "easypeasy") {
  Root = (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
} else if (storeType === "contextapi") {
  Root = (
    <TokenProvider>
      <App />
    </TokenProvider>
  );
}
// Zustand (default) and fallback: just <App />

ReactDOM.createRoot(document.getElementById("root")).render(Root);