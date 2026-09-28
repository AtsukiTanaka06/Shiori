import type { ReadingStatus } from '../types';
import { todayString } from './date';

interface StatusDates {
  startedAt?: string;
  finishedAt?: string;
}

/**
 * ステータス変更時の開始日・終了日の自動設定ロジック。
 * - 「読書中」に変更し、開始日が未設定なら `today` を設定する
 * - 「読了」に変更し、終了日が未設定なら `today` を設定する
 * - 上記以外は既存の値を維持する（既に設定済みの日付を上書きしない）
 */
export function resolveStatusDates(
  current: StatusDates,
  nextStatus: ReadingStatus,
  today: string = todayString()
): StatusDates {
  return {
    startedAt: nextStatus === 'reading' && !current.startedAt ? today : current.startedAt,
    finishedAt: nextStatus === 'finished' && !current.finishedAt ? today : current.finishedAt,
  };
}
