import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const resolvers = {
  Query: {
    todos: async () => {
      try {
        const snapshot = await getDocs(collection(db, "todos"));
        const todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return todos;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
  },
  Mutation: {
    createTodo: async (_, { title }) => {
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title,
          completed: false,
        });
        const newTodo = { id: docRef.id, title, completed: false };
        return newTodo;
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    },
    updateTodo: async (_, { id, completed }) => {
      try {
        const docRef = doc(db, "todos", id);
        await updateDoc(docRef, { completed });
        const updatedTodoSnapshot = await getDoc(docRef);
        const updatedTodo = {
          id: updatedTodoSnapshot.id,
          ...updatedTodoSnapshot.data(),
        };
        return updatedTodo;
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        await deleteDoc(doc(db, "todos", id));
        return true;
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
};
