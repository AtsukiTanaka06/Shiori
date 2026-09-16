import { supabase } from '../lib/supabase';
import type { Book, BookWithRecord, ReadingRecord, ReadingStatus } from '../types';
import type { Database } from '../types/database';

type RecordRow = Database['public']['Tables']['reading_records']['Row'];
type BookRow = Database['public']['Tables']['books']['Row'];
type RecordInsert = Database['public']['Tables']['reading_records']['Insert'];
type RecordUpdate = Database['public']['Tables']['reading_records']['Update'];

// JOIN クエリの結果型
type RecordWithBook = RecordRow & { books: BookRow };

function toRecord(row: RecordRow): ReadingRecord {
  return {
    id: row.id,
    userId: row.user_id,
    bookId: row.book_id,
    status: row.status,
    startedAt: row.started_at ?? undefined,
    finishedAt: row.finished_at ?? undefined,
    rating: row.rating ?? undefined,
    impression: row.impression ?? undefined,
    memo: row.memo ?? undefined,
    createdAt: row.created_at,
  };
}

function toBook(row: BookRow): Book {
  return {
    id: row.id,
    isbn: row.isbn,
    title: row.title,
    authors: row.authors,
    coverImage: row.cover_image ?? undefined,
    publisher: row.publisher ?? undefined,
    publishedAt: row.published_at ?? undefined,
    pageCount: row.page_count ?? undefined,
    genre: row.genre ?? undefined,
    createdAt: row.created_at,
  };
}

export const recordService = {
  /** ユーザーの全読書記録を書籍情報とともに取得（登録日時の新しい順） */
  async findByUserId(userId: string): Promise<BookWithRecord[]> {
    const { data, error } = await supabase
      .from('reading_records')
      .select('*, books(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;

    return (data ?? []).map((row) => {
      const typed = row as unknown as RecordWithBook;
      return {
        record: toRecord(typed),
        book: toBook(typed.books),
      };
    });
  },

  /** 同一ユーザー・同一書籍の記録を取得（二重登録チェック用） */
  async findByUserAndBook(userId: string, bookId: string): Promise<ReadingRecord | null> {
    const { data, error } = await supabase
      .from('reading_records')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .maybeSingle();
    if (error) throw error;
    return data ? toRecord(data) : null;
  },

  /** 読書記録を新規作成 */
  async create(params: {
    userId: string;
    bookId: string;
    status: ReadingStatus;
  }): Promise<ReadingRecord> {
    const insert: RecordInsert = {
      user_id: params.userId,
      book_id: params.bookId,
      status: params.status,
    };
    const { data, error } = await supabase
      .from('reading_records')
      .insert(insert)
      .select()
      .single();
    if (error) throw error;
    return toRecord(data);
  },

  /** 読書記録を更新 */
  async update(
    id: string,
    updates: {
      status?: ReadingStatus;
      startedAt?: string | null;
      finishedAt?: string | null;
      rating?: number | null;
      impression?: string | null;
      memo?: string | null;
    }
  ): Promise<ReadingRecord> {
    const patch: RecordUpdate = {
      status: updates.status,
      started_at: updates.startedAt,
      finished_at: updates.finishedAt,
      rating: updates.rating,
      impression: updates.impression,
      memo: updates.memo,
    };
    const { data, error } = await supabase
      .from('reading_records')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return toRecord(data);
  },

  /** 読書記録を削除 */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reading_records')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
