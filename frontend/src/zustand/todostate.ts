import { create } from 'zustand';
import axios from 'axios';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  fetchTodos: (userId: number | null) => Promise<void>;
  addTodo: (userId: number | null, text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
}

const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  fetchTodos: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({
        todos: response.data.todos.map((todo: any) => ({
          id: todo.id,
          text: todo.title,
          completed: todo.completed,
        })),
      });
    } catch (error) {
      set({ todos: [] });
    }
  },
  addTodo: async (userId, text) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/todos/create',
        { userId, title: text },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refetch todos after adding
      await get().fetchTodos(userId);
    } catch (error) {
      // Handle error
    }
  },
  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      await axios.put(
        `http://localhost:3000/api/todos/update/${id}`,
        { completed: !todo.completed },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      }));
    } catch (error) {
      // Handle error
    }
  },
  removeTodo: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    } catch (error) {
      // Handle error
    }
  },
}));

export default useTodoStore;

