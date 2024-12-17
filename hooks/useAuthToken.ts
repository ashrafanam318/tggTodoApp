import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";

const TOKEN_KEY = "authToken";

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        setToken(storedToken);
        setIsInitializing(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (token !== null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const saveToken = async (newToken: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const clearToken = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return {
    token,
    isInitializing,
    saveToken,
    clearToken,
  };
};
