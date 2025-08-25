import { create } from "zustand";

export const useTokenStore = create((set) => ({
  token: localStorage.getItem("access_token") || "",
  setToken: (token) => {
    localStorage.setItem("access_token", token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("access_token");
    set({ token: "" });
  },
}));

export const setToken = (token) => useTokenStore.getState().setToken(token);
export const clearToken = () => useTokenStore.getState().clearToken();
export const getToken = () => useTokenStore.getState().token;