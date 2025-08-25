import { getToken as getEasyPeasyToken, setToken as setEasyPeasyToken, clearToken as clearEasyPeasyToken } from "../store/easyPeasyStore";
import { getToken as getZustandToken, setToken as setZustandToken, clearToken as clearZustandToken } from "../store/zustandStore";
import { getToken as getContextToken, setToken as setContextToken, clearToken as clearContextToken } from "../store/contextStore";

const storeType = import.meta.env.VITE_STORE_TYPE;

let getToken, setToken, clearToken;

if (storeType === "easypeasy") {
  getToken = getEasyPeasyToken;
  setToken = setEasyPeasyToken;
  clearToken = clearEasyPeasyToken;
} else if (storeType === "contextapi") {
  getToken = getContextToken;
  setToken = setContextToken;
  clearToken = clearContextToken;
} else {
  // Default to zustand
  getToken = getZustandToken;
  setToken = setZustandToken;
  clearToken = clearZustandToken;
}

export { getToken, setToken, clearToken };