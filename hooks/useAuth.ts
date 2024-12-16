import { AuthCredentials, AuthResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const register = async (credentials: AuthCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials: AuthCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
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
