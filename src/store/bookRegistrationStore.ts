import { create } from 'zustand';

import type { Book, ReadingStatus } from '../types';

interface BookRegistrationState {
  /** 登録対象の書籍（API から取得済み） */
  pendingBook: Book | null;
  /** 選択中のステータス */
  status: ReadingStatus;
  setPendingBook: (book: Book | null) => void;
  setStatus: (status: ReadingStatus) => void;
  reset: () => void;
}

export const useBookRegistrationStore = create<BookRegistrationState>((set) => ({
  pendingBook: null,
  status: 'to_read',
  setPendingBook: (book) => set({ pendingBook: book }),
  setStatus: (status) => set({ status }),
  reset: () => set({ pendingBook: null, status: 'to_read' }),
}));
