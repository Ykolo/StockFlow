import { create } from "zustand";

interface SessionState {
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => {
    console.log("🔍 Zustand: session mise à jour ->", user); // Debug
    set({ user });
  },
}));
