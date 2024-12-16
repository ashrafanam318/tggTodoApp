import { useAuthToken } from "../hooks/useAuthToken";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const { token } = useAuthToken();
  return token ? <Redirect href={"/home"} /> : <Redirect href="/login" />;
}
