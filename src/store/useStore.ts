import { create } from 'zustand';
import type { User, Task, Post } from '../types';

interface Store {
  user: User | null;
  tasks: Task[];
  posts: Post[];
  darkMode: boolean;
  sidebarOpen: boolean;
  setUser: (user: User | null) => void;
  addTask: (task: Task) => void;
  toggleTaskComplete: (taskId: string) => void;
  addPost: (post: Post) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  tasks: [],
  posts: [],
  darkMode: true,
  sidebarOpen: false, // Set sidebar closed by default
  setUser: (user) => set({ user }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTaskComplete: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));