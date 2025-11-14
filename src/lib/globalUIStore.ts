import { create } from 'zustand';

interface GlobalUIState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  modalState: { isOpen: boolean; type?: string; data?: unknown };
  setModalState: (state: Partial<GlobalUIState['modalState']>) => void;
}

export const useGlobalUIStore = create<GlobalUIState>(set => ({
  isLoading: false,
  setLoading: loading => set({ isLoading: loading }),
  modalState: { isOpen: false },
  setModalState: newState => set(state => ({ modalState: { ...state.modalState, ...newState } })),
}));
