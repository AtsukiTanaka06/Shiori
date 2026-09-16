import { supabase } from '../lib/supabase';
import type { Book } from '../types';
import type { Database } from '../types/database';

type BookRow = Database['public']['Tables']['books']['Row'];
type BookInsert = Database['public']['Tables']['books']['Insert'];

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

type BookCreateInput = Omit<BookInsert, 'id' | 'created_at'>;

export const bookService = {
  async findByIsbn(isbn: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('isbn', isbn)
      .maybeSingle();
    if (error) throw error;
    return data ? toBook(data) : null;
  },

  async findById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toBook(data) : null;
  },

  async create(input: BookCreateInput): Promise<Book> {
    const { data, error } = await supabase
      .from('books')
      .insert(input as BookInsert)
      .select()
      .single();
    if (error) throw error;
    return toBook(data);
  },

  /**
   * ISBN で検索し、存在しなければ新規作成して返す（Upsert 相当）
   */
  async findOrCreate(input: BookCreateInput): Promise<Book> {
    const existing = await bookService.findByIsbn(input.isbn);
    if (existing) return existing;
    return bookService.create(input);
  },
};
