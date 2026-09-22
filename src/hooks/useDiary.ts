import { useCallback, useEffect, useMemo, useState } from 'react';

import { diaryService } from '../services/diaryService';
import { useAuthStore } from '../store/authStore';
import type { DiaryEntry } from '../types';
import { isReadingOnDate } from '../utils/isReadingOnDate';
import { useBookshelf } from './useBookshelf';

/**
 * カレンダー日別ビュー用フック。
 * 指定日に読書中の本の一覧と、その日に記入済みの日記メモを取得する。
 */
export function useDiary(selectedDate: string) {
  const user = useAuthStore((s) => s.user);
  const { items } = useBookshelf();
  const [entriesByBook, setEntriesByBook] = useState<Record<string, DiaryEntry>>({});
  const [isLoading, setIsLoading] = useState(false);

  const booksReadingOnSelectedDate = useMemo(
    () => items.filter((item) => isReadingOnDate(item.record, selectedDate)),
    [items, selectedDate]
  );

  const load = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const entries = await diaryService.findByUserAndDate(user.id, selectedDate);
      setEntriesByBook(Object.fromEntries(entries.map((e) => [e.bookId, e])));
    } finally {
      setIsLoading(false);
    }
  }, [user, selectedDate]);

  useEffect(() => {
    void load();
  }, [load]);

  const saveMemo = useCallback(
    async (bookId: string, memo: string) => {
      if (!user) return;
      const entry = await diaryService.upsert({
        userId: user.id,
        bookId,
        entryDate: selectedDate,
        memo,
      });
      setEntriesByBook((prev) => ({ ...prev, [bookId]: entry }));
    },
    [user, selectedDate]
  );

  return { booksReadingOnSelectedDate, entriesByBook, isLoading, saveMemo };
}
