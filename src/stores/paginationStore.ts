import { create } from "zustand";

interface PaginationState {
  currentPage: number;
  setPage: (page: number) => void;
  nextPage: (totalPages: number) => void;
  prevPage: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  setPage: (page) => set({ currentPage: page }),
  nextPage: (totalPages) =>
    set((state) => ({
      currentPage: Math.min(state.currentPage + 1, totalPages),
    })),
  prevPage: () =>
    set((state) => ({
      currentPage: Math.max(state.currentPage - 1, 1),
    })),
}));
