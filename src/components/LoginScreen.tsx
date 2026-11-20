
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <Text style={styles.description}>
        Login to access your notes.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
        </Text>

        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.signupText}> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#252238",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#777387",
    marginBottom: 35,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#7056D8",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#777387",
  },
  signupText: {
    color: "#7056D8",
    fontWeight: "bold",
  },
});
