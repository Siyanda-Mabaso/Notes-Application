
import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function RegisterScreen() {
  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setErrorMessage("");

    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const success = await register(username, email, password);

    if (success) {
      router.replace("/home");
    } else {
      setErrorMessage("This email is already registered.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.description}>
        Sign up to start organising your notes.
      </Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

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

      <Pressable
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.registerText}>Create Account</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?
        </Text>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.loginText}> Login</Text>
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
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 15,
  },
  registerButton: {
    backgroundColor: "#7056D8",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
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
  loginText: {
    color: "#7056D8",
    fontWeight: "bold",
  },
});
