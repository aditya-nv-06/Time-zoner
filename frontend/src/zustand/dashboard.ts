import { create } from 'zustand';
import axios from 'axios';

export interface DashboardData {
  totalTodos: number;
  totalNotes: number;
}

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchTodoData: (userId: number | null) => Promise<void>;
  fetchNoteData: (userId: number | null) => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchTodoData: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const totalTodos = response.data.todos.length;
      set((state) => ({
        data: { ...state.data, totalTodos, totalNotes: state.data?.totalNotes ?? 0 },
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || 'Failed to fetch todo data',
      });
    }
  },

  fetchNoteData: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/notes/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const totalNotes = response.data.notes.length;
      set((state) => ({
        data: { ...state.data, totalNotes, totalTodos: state.data?.totalTodos ?? 0 },
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || 'Failed to fetch note data',
      });
    }
  },
}));

export default useDashboardStore;

