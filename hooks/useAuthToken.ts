import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const TOKEN_KEY = "authToken";

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        setToken(storedToken);
      } catch (error) {}
    };

    loadToken();
  }, []);

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
    saveToken,
    clearToken,
  };
};
