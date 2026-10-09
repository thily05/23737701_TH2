import { create } from 'zustand';
import { STUDENT } from '@constants/student';

interface AuthState {
    token: string | null;
    login: (stamp: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    login: (stamp: string) => set({ token: `ktxgo-${STUDENT.mssv}-${stamp}` }),
    logout: () => set({ token: null }),
}));