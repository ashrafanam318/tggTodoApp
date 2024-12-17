import { Colors } from "../constants/Colors";
import { useAuthToken } from "../hooks/useAuthToken";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Index() {
  const { token, isInitializing } = useAuthToken();
  if (isInitializing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={"large"} color={Colors.tint} />
      </View>
    );
  }
  return token ? <Redirect href={"/home"} /> : <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
