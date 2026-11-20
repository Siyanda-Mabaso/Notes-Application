
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getNotes, saveNotes } from "../services/noteService";
import { Note } from "../types/Note";

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<
    "Work" | "Study" | "Personal"
  >("Personal");

  useEffect(() => {
    const loadNote = async () => {
      const notes = await getNotes();
      const foundNote = notes.find((item) => item.id === id);

      if (foundNote) {
        setNote(foundNote);
        setTitle(foundNote.title);
        setContent(foundNote.content);
        setCategory(foundNote.category);
      }
    };

    loadNote();
  }, [id]);

  const handleUpdateNote = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please enter your note.");
      return;
    }

    if (!note) {
      return;
    }

    const notes = await getNotes();

    const updatedNotes = notes.map((item) =>
      item.id === id
        ? {
            ...item,
            title: title.trim(),
            content: content.trim(),
            category,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    await saveNotes(updatedNotes);

    Alert.alert("Success", "Your note has been updated!");
    router.replace("/home");
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Loading note...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit Note</Text>

      <Text style={styles.label}>Note Title (Optional)</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>

      <View style={styles.categoryContainer}>
        {(["Work", "Study", "Personal"] as const).map((item) => (
          <Pressable
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Your Note</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Write your thoughts here..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      <Pressable
        style={styles.saveButton}
        onPress={handleUpdateNote}
      >
        <Text style={styles.saveButtonText}>Update Note</Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#252238",
    marginTop: 40,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#252238",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 25,
    fontSize: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
    flexWrap: "wrap",
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E0F5",
  },
  selectedCategory: {
    backgroundColor: "#7056D8",
    borderColor: "#7056D8",
  },
  categoryText: {
    color: "#777387",
    fontWeight: "600",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  textArea: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    height: 180,
    fontSize: 15,
    marginBottom: 25,
  },
  saveButton: {
    backgroundColor: "#7056D8",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  cancelButtonText: {
    color: "#777387",
    fontSize: 15,
    fontWeight: "600",
  },
});
