
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const USERS_KEY = "users";

// Get all registered users
export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);

    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.log("Error getting users:", error);
    return [];
  }
};

// Save users
export const saveUsers = async (users: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.log("Error saving users:", error);
  }
};
