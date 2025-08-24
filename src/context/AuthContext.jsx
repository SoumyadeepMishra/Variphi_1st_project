import { createContext, useContext, useMemo, useState } from "react";
import { postRequest } from "../axios/api";
import { getToken, setToken as saveToken, clearToken } from "../services/authStorage";

const AuthContext = createContext(null);

const AUTH_BASE = import.meta.env.VITE_AUTH_API_URL || "https://api.surveillance.variphi.com";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const login = async ({ email, password }) => {
    setAuthLoading(true);
    try {
      // API request
      const res = await postRequest(`${AUTH_BASE}/client/auth/signin`, { email, password });

      // ✅ Fix: use res.data
      const apiData = res?.data;
      const t = apiData?.token;

      if (t) {
        // save token in storage
        saveToken(t);
        setToken(t);

        // save user details
        setUser({
          email: apiData.email,
          id: apiData.id,
          roles: apiData.roles || [],
        });
      }

      return res; // return whole response (with success/error flags)
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    setAuthLoading(true);
    try {
      const res = await postRequest(`${AUTH_BASE}/client/auth/signup`, { name, email, password });
      return res;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      login,
      signup,
      logout,
      authLoading,
    }),
    [token, user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
