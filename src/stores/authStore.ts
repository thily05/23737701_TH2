import { create } from 'zustand';
import { STUDENT, examStamp } from '@constants/student';

interface AuthState {
    token: string | null;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    login: () => {
        // Chuẩn đề: ktxgo-{mssv}-{stamp}
        const token = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
        set({ token });
    },
    logout: () => {
        set({ token: null });
    },
}));