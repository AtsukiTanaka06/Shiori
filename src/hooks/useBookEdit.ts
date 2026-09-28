import { useCallback, useEffect, useState } from 'react';

import { bookService } from '../services/bookService';
import { diaryService } from '../services/diaryService';
import { recordService } from '../services/recordService';
import { useAuthStore } from '../store/authStore';
import type { Book, ReadingRecord, ReadingStatus } from '../types';
import { resolveStatusDates } from '../utils/resolveStatusDates';

/**
 * 本の編集画面用フック。読書記録の編集フォーム状態を管理し、保存・削除を行う。
 */
export function useBookEdit(bookId: string) {
  const user = useAuthStore((s) => s.user);

  const [book, setBook] = useState<Book | null>(null);
  const [record, setRecord] = useState<ReadingRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [status, setStatusState] = useState<ReadingStatus>('to_read');
  const [startedAt, setStartedAt] = useState<string | undefined>(undefined);
  const [finishedAt, setFinishedAt] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [impression, setImpression] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    if (!user) return;
    let isActive = true;
    (async () => {
      setIsLoading(true);
      try {
        const [b, r] = await Promise.all([
          bookService.findById(bookId),
          recordService.findByUserAndBook(user.id, bookId),
        ]);
        if (!isActive) return;
        setBook(b);
        setRecord(r);
        if (r) {
          setStatusState(r.status);
          setStartedAt(r.startedAt);
          setFinishedAt(r.finishedAt);
          setRating(r.rating);
          setImpression(r.impression ?? '');
          setMemo(r.memo ?? '');
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [user, bookId]);

  // ステータスを「読書中」「読了」に変更した際、開始日・終了日が未設定なら今日を自動設定する
  const setStatus = useCallback(
    (next: ReadingStatus) => {
      setStatusState(next);
      const resolved = resolveStatusDates({ startedAt, finishedAt }, next);
      setStartedAt(resolved.startedAt);
      setFinishedAt(resolved.finishedAt);
    },
    [startedAt, finishedAt]
  );

  const save = useCallback(async () => {
    if (!record) return;
    setIsSaving(true);
    try {
      const updated = await recordService.update(record.id, {
        status,
        startedAt: startedAt ?? null,
        finishedAt: finishedAt ?? null,
        rating: rating ?? null,
        impression: impression.trim() ? impression.trim() : null,
        memo: memo.trim() ? memo.trim() : null,
      });
      setRecord(updated);
    } finally {
      setIsSaving(false);
    }
  }, [record, status, startedAt, finishedAt, rating, impression, memo]);

  const remove = useCallback(async () => {
    if (!record || !user) return;
    await recordService.delete(record.id);
    await diaryService.deleteByBookId(user.id, bookId);
  }, [record, user, bookId]);

  return {
    book,
    record,
    isLoading,
    isSaving,
    status,
    setStatus,
    rating,
    setRating,
    impression,
    setImpression,
    memo,
    setMemo,
    save,
    remove,
  };
}
