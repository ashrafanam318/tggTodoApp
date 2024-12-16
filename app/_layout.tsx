import React from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar style={"light"} />
        <View style={styles.contentContainer}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    ...Platform.select({ web: { alignItems: "center" } }),
  },
  contentContainer: {
    flex: 1,
    ...Platform.select({ web: { width: "100%", maxWidth: 480 } }),
  },
});
