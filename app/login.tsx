import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://<your-backend-url>/login", {
        username,
        password,
      });
      const token = response.data.token;
      Alert.alert("Login Successful");
      router.push("/home"); // Navigate to Home screen
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.registerLink}
        onPress={() => router.push("/register")}
      >
        Don’t have an account? Register
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  registerLink: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
});
