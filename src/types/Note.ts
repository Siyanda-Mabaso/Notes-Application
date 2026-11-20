
export interface Note {
  id: string;
  title: string;
  content: string;
  category: "Work" | "Study" | "Personal";
  createdAt: string;
  updatedAt: string;
  userId: string;
}
