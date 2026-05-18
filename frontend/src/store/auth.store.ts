import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth.types';
import { storage } from '../utils/storage';

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: storage.get<User>('user'),
      token: storage.get<string>('token'),
      isAuthenticated: !!storage.get<string>('token'),

      login: (user: User, token: string) => {
        storage.set('user', user);
        storage.set('token', token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        storage.clear();
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user: User) => {
        storage.set('user', user);
        set({ user });
      },
    }),
    { name: 'auth-store' }
  )
);
