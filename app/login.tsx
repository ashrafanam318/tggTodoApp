import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { AxiosError } from "axios";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useAuthToken } from "../hooks/useAuthToken";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const showAuthErrorAlert = (message?: string) => {
    if (Platform.OS === "web") {
      alert(
        ` ${
          message ??
          "Something went wrong! Please try again later or with a different account."
        }`
      );
    } else {
      Alert.alert(
        "Error!",
        message ??
          "Something went wrong! Please try again later or with a different account."
      );
    }
  };

  const { saveToken } = useAuthToken();

  const { mutate: loginOrRegister, isPending } = useAuth(
    (data) => {
      saveToken(data.token).then(() => router.push("/home"));
    },
    (error: AxiosError<{ message: string }>) => {
      showAuthErrorAlert(error.response?.data.message);
    }
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <TextInput
        placeholder="Username"
        placeholderTextColor={Colors.border}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.border}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable
        disabled={!username || !password}
        onPress={() => loginOrRegister({ username, password })}
      >
        <View style={styles.entryButton}>
          {isPending ? (
            <ActivityIndicator size={"small"} color={Colors.tint} />
          ) : (
            <>
              <Text style={styles.entryText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.tint} />
            </>
          )}
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "40%",
    padding: 20,
    backgroundColor: Colors.background,
  },
  input: {
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 14,
    color: Colors.text,
  },
  entryButton: {
    padding: 20,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  entryText: { fontSize: 14, fontWeight: "medium", color: Colors.tint },
});
