import CONSTANTS from "expo-constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AuthCredentials, AuthResponse } from "../shared/types";

const API_URL = CONSTANTS.expoConfig?.extra?.apiUrl + "/api/auth";

const register = async (credentials: AuthCredentials) => {
  try {
    const response = await axios.post(API_URL + "/register", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials: AuthCredentials) => {
  try {
    const response = await axios.post(API_URL + "/login", credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (
      error.status === 400 &&
      error.response?.data.message.match(/user not found/i)
    ) {
      register(credentials);
    } else {
      throw error;
    }
  }
};

export const useAuth = (
  onSuccess?: (data: AuthResponse) => void,
  onError?: (error: any) => void
) => {
  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
