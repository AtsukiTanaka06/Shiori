import type { ReadingRecord } from '../types';

/**
 * 指定した日付にその本を読書中かどうかを判定する。
 * 「読書中」= started_at が設定済み かつ（finished_at が未設定 または その日以降）
 *
 * ISO 'YYYY-MM-DD' 形式の文字列は辞書順比較が日付の前後関係と一致するため、
 * Date への変換なしに文字列比較で判定できる。
 */
export function isReadingOnDate(
  record: Pick<ReadingRecord, 'startedAt' | 'finishedAt'>,
  date: string
): boolean {
  if (!record.startedAt) return false;
  if (record.startedAt > date) return false;
  if (record.finishedAt && record.finishedAt < date) return false;
  return true;
}
