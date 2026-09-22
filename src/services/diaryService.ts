import { supabase } from '../lib/supabase';
import type { DiaryEntry } from '../types';
import type { Database } from '../types/database';

type DiaryEntryRow = Database['public']['Tables']['diary_entries']['Row'];
type DiaryEntryInsert = Database['public']['Tables']['diary_entries']['Insert'];

function toDiaryEntry(row: DiaryEntryRow): DiaryEntry {
  return {
    id: row.id,
    userId: row.user_id,
    bookId: row.book_id,
    entryDate: row.entry_date,
    memo: row.memo,
    createdAt: row.created_at,
  };
}

export const diaryService = {
  /** 本に紐づく日記エントリを日付の新しい順に取得（本の詳細画面用） */
  async findByBookId(userId: string, bookId: string): Promise<DiaryEntry[]> {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .order('entry_date', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(toDiaryEntry);
  },

  /** 指定日の全日記エントリを取得（カレンダー日別ビュー用） */
  async findByUserAndDate(userId: string, date: string): Promise<DiaryEntry[]> {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('entry_date', date);
    if (error) throw error;
    return (data ?? []).map(toDiaryEntry);
  },

  /** 本×日付の日記エントリを作成または上書き更新 */
  async upsert(params: {
    userId: string;
    bookId: string;
    entryDate: string;
    memo: string;
  }): Promise<DiaryEntry> {
    const insert: DiaryEntryInsert = {
      user_id: params.userId,
      book_id: params.bookId,
      entry_date: params.entryDate,
      memo: params.memo,
    };
    const { data, error } = await supabase
      .from('diary_entries')
      .upsert(insert, { onConflict: 'user_id,book_id,entry_date' })
      .select()
      .single();
    if (error) throw error;
    return toDiaryEntry(data);
  },
};
