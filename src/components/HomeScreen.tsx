
import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {user?.username}!
      </Text>

      <Text style={styles.description}>
        Your notes, all in one place.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#252238",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#777387",
  },
});
