import { useCallback, useState } from 'react';

import { bookService } from '../services/bookService';
import { diaryService } from '../services/diaryService';
import { recordService } from '../services/recordService';
import { useAuthStore } from '../store/authStore';
import type { Book, DiaryEntry, ReadingRecord } from '../types';

/**
 * 本の詳細画面用フック。書籍情報・読書記録・日記エントリをまとめて取得する。
 * 画面のフォーカス時に呼び出し側で `refresh` を呼ぶこと（編集画面からの戻り時に最新化するため）。
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

  return { book, record, diaryEntries, isLoading, refresh: load };
}
