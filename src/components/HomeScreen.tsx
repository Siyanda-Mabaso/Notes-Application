
import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { getNotes } from "../services/noteService";
import { Note } from "../types/Note";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notes, setNotes] = useState<Note[]>([]);

  const categories = ["All", "Work", "Study", "Personal"];

  // Load notes from storage
  useEffect(() => {
    const loadNotes = async () => {
      const savedNotes = await getNotes();

      const userNotes = savedNotes.filter(
        (note) => note.userId === user?.id
      );

      setNotes(userNotes);
    };

    loadNotes();
  }, [user]);

  // Filter notes by category
  const filteredNotes =
    selectedCategory === "All"
      ? notes
      : notes.filter(
          (note) => note.category === selectedCategory
        );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.username}!</Text>
          <Text style={styles.subtitle}>
            What would you like to note today?
          </Text>
        </View>

        <View style={styles.profileIcon}>
          <Text style={styles.profileText}>
            {user?.username?.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>
          Your thoughts, your space.
        </Text>

        <Text style={styles.welcomeDescription}>
          Keep your ideas organised and never lose an important thought.
        </Text>
      </View>

      <Pressable
        style={styles.addNoteButton}
        onPress={() => router.push("/add-note")}
      >
        <Text style={styles.addNoteButtonText}>
          + Create New Note
        </Text>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category &&
                styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category &&
                  styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Notes</Text>
      </View>

      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>

          <Text style={styles.emptyTitle}>No notes yet</Text>

          <Text style={styles.emptyDescription}>
            Your notes will appear here. Start by creating your first note.
          </Text>
        </View>
      ) : (
        filteredNotes.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            <Text style={styles.noteTitle}>
              {note.title || "Untitled Note"}
            </Text>

            <Text style={styles.noteContent}>
              {note.content}
            </Text>

            <View style={styles.noteFooter}>
              <Text style={styles.noteCategory}>
                {note.category}
              </Text>

              <Text style={styles.noteDate}>
                {new Date(note.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.noteActions}>
              <Pressable
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname: "/edit-note",
                    params: { id: note.id },
                  })
                }
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  // Delete functionality will be added next.
                }}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 55,
    marginBottom: 28,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#252238",
  },
  subtitle: {
    fontSize: 14,
    color: "#777387",
    marginTop: 6,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7056D8",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeCard: {
    backgroundColor: "#7056D8",
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  welcomeDescription: {
    fontSize: 14,
    color: "#F0EBFF",
    lineHeight: 22,
  },
  addNoteButton: {
    backgroundColor: "#7056D8",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  addNoteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#252238",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E0F5",
  },
  selectedCategory: {
    backgroundColor: "#7056D8",
    borderColor: "#7056D8",
  },
  categoryText: {
    color: "#777387",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#252238",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#777387",
    textAlign: "center",
    lineHeight: 22,
  },
  noteCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#252238",
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 14,
    color: "#777387",
    lineHeight: 22,
    marginBottom: 15,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteCategory: {
    color: "#7056D8",
    fontWeight: "bold",
    fontSize: 13,
  },
  noteDate: {
    color: "#9994A8",
    fontSize: 12,
  },
  noteActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#7056D8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FCE8E8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#D64545",
    fontWeight: "bold",
  },
});
