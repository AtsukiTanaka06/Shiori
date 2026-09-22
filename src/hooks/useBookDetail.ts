import { useCallback, useEffect, useState } from 'react';

import { bookService } from '../services/bookService';
import { diaryService } from '../services/diaryService';
import { recordService } from '../services/recordService';
import { useAuthStore } from '../store/authStore';
import type { Book, DiaryEntry, ReadingRecord } from '../types';

/**
 * 本の詳細画面用フック。書籍情報・読書記録・日記エントリをまとめて取得する。
 */
export function useBookDetail(bookId: string) {
  const user = useAuthStore((s) => s.user);
  const [book, setBook] = useState<Book | null>(null);
  const [record, setRecord] = useState<ReadingRecord | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [b, r, entries] = await Promise.all([
        bookService.findById(bookId),
        recordService.findByUserAndBook(user.id, bookId),
        diaryService.findByBookId(user.id, bookId),
      ]);
      setBook(b);
      setRecord(r);
      setDiaryEntries(entries);
    } finally {
      setIsLoading(false);
    }
  }, [user, bookId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { book, record, diaryEntries, isLoading, refresh: load };
}
