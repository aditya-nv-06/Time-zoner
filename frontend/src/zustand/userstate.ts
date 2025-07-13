import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  username: string;
  password: string;
  email: string | null;
  user: User | null;
  isloggedIn: boolean;
  loading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  clearFields: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  password: '',
  email: null,
  user: null,
  isloggedIn: false,
  loading: false,
  error: null,
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setUser: (user) => set({ user, isloggedIn: !!user, email: user?.email ?? null, password: '', username: '' }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearUser: () => set({ user: null, isloggedIn: false, email: null, password: '', username: '' }),
  clearFields: () => set({ email: null, password: '', username: '', error: null }),
}));

export default useUserStore;

