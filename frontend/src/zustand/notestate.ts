import { create } from 'zustand';
import axios from 'axios';

export interface Note {
  id: number;
  text: string;
}

interface NoteState {
  notes: Note[];
  fetchNotes: (userId: number | null) => Promise<void>;
  addNote: (userId: number | null, text: string) => Promise<void>;
  removeNote: (id: number) => Promise<void>;
}

const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  fetchNotes: async (userId) => {
    if (userId === null) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/notes/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({
        notes: response.data.notes.map((note: any) => ({
          id: note.id,
          text: note.content,
        })),
      });
    } catch (error) {
      set({ notes: [] });
    }
  },
  addNote: async (userId, text) => {
    if (userId === null || !text.trim()) return;
    try {
      await axios.post(
        'http://localhost:3000/api/notes/create',
        { userId, content: text.trim() },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      await get().fetchNotes(userId);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  },
  removeNote: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({ notes: get().notes.filter((note) => note.id !== id) });
    } catch (error) {
      console.error('Error removing note:', error);
    }
  },
}));

export default useNoteStore;
