import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Index() {
  return true ? <Redirect href={"/home"} /> : <Redirect href="/login" />;
}
