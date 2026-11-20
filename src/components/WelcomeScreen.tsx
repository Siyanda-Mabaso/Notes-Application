
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>NoteNest</Text>

        <Text style={styles.title}>
          Your thoughts,{"\n"}your space.
        </Text>

        <Text style={styles.description}>
          Keep your ideas organised and your thoughts safe,
          all in one place.
        </Text>

        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.signupButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.signupText}>Create Account</Text>
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
  content: {
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7056D8",
    marginBottom: 65,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#252238",
    textAlign: "center",
    lineHeight: 46,
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    color: "#777387",
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 45,
  },
  loginButton: {
    backgroundColor: "#7056D8",
    width: "100%",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    borderWidth: 1.5,
    borderColor: "#7056D8",
    width: "100%",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
  },
  signupText: {
    color: "#7056D8",
    fontSize: 16,
    fontWeight: "bold",
  },
});
