import { create } from 'zustand';

import type { BookWithRecord, BookshelfDisplayMode, ReadingStatus } from '../types';

type BookshelfFilter = 'all' | ReadingStatus;

interface BookshelfState {
  items: BookWithRecord[];
  filter: BookshelfFilter;
  displayMode: BookshelfDisplayMode;
  setItems: (items: BookWithRecord[]) => void;
  setFilter: (filter: BookshelfFilter) => void;
  setDisplayMode: (mode: BookshelfDisplayMode) => void;
}

export const useBookshelfStore = create<BookshelfState>((set) => ({
  items: [],
  filter: 'all',
  displayMode: 'list',
  setItems: (items) => set({ items }),
  setFilter: (filter) => set({ filter }),
  setDisplayMode: (displayMode) => set({ displayMode }),
}));
