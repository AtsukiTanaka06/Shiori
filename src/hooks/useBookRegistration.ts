import { useState } from 'react';

import { useAuthStore } from '../store/authStore';
import { useBookRegistrationStore } from '../store/bookRegistrationStore';
import { bookApiService } from '../services/bookApiService';
import { bookService } from '../services/bookService';
import { recordService } from '../services/recordService';
import type { Book, ReadingStatus } from '../types';
import { todayString } from '../utils/date';

export function useBookRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((s) => s.user);
  const { pendingBook, status, setPendingBook, setStatus, reset } = useBookRegistrationStore();

  /** ISBN から書籍を取得してストアにセット */
  async function fetchByIsbn(isbn: string): Promise<Book | null> {
    setIsLoading(true);
    setError(null);
    try {
      const book = await bookApiService.fetchByIsbn(isbn);
      if (book) setPendingBook(book);
      return book;
    } catch {
      setError('書籍情報の取得に失敗しました');
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  /** 書籍を本棚に登録する */
  async function register(): Promise<{ alreadyRegistered: boolean }> {
    if (!pendingBook || !user) throw new Error('書籍情報またはユーザー情報がありません');

    setIsLoading(true);
    setError(null);
    try {
      // books テーブルに upsert
      const book = await bookService.findOrCreate({
        isbn: pendingBook.isbn,
        title: pendingBook.title,
        authors: pendingBook.authors,
        cover_image: pendingBook.coverImage ?? null,
        publisher: pendingBook.publisher ?? null,
        published_at: pendingBook.publishedAt ?? null,
        page_count: pendingBook.pageCount ?? null,
        genre: pendingBook.genre ?? null,
      });

      // 二重登録チェック
      const existing = await recordService.findByUserAndBook(user.id, book.id);
      if (existing) return { alreadyRegistered: true };

      // 読書記録を作成（「読書中」を選んだ場合は開始日を今日にする）
      await recordService.create({
        userId: user.id,
        bookId: book.id,
        status: status as ReadingStatus,
        startedAt: status === 'reading' ? todayString() : undefined,
      });

      reset();
      return { alreadyRegistered: false };
    } catch {
      setError('登録に失敗しました');
      throw new Error('登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    pendingBook,
    status,
    isLoading,
    error,
    setStatus,
    setPendingBook,
    fetchByIsbn,
    register,
    reset,
  };
}
