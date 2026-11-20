
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../types/Note";

const NOTES_KEY = "notes";

// Get all saved notes
export const getNotes = async (): Promise<Note[]> => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);

    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.log("Error getting notes:", error);
    return [];
  }
};

// Save notes
export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.log("Error saving notes:", error);
  }
};
