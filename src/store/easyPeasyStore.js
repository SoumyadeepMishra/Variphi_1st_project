import { createStore, action } from "easy-peasy";

const easyPeasyModel = {
  token: localStorage.getItem("access_token") || "",
  setToken: action((state, payload) => {
    state.token = payload;
    localStorage.setItem("access_token", payload);
  }),
  clearToken: action((state) => {
    state.token = "";
    localStorage.removeItem("access_token");
  }),
};

export const store = createStore(easyPeasyModel);

export const setToken = (token) => store.getActions().setToken(token);
export const clearToken = () => store.getActions().clearToken();
export const getToken = () => store.getState().token;