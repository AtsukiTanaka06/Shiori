/**
 * Supabase Database 型定義
 * createClient<Database> に渡すことで型安全なクエリが可能になる
 */
export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          isbn: string;
          title: string;
          authors: string[];
          cover_image: string | null;
          publisher: string | null;
          published_at: string | null;
          page_count: number | null;
          genre: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          isbn: string;
          title: string;
          authors?: string[];
          cover_image?: string | null;
          publisher?: string | null;
          published_at?: string | null;
          page_count?: number | null;
          genre?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          isbn?: string;
          title?: string;
          authors?: string[];
          cover_image?: string | null;
          publisher?: string | null;
          published_at?: string | null;
          page_count?: number | null;
          genre?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reading_records: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          status: 'to_read' | 'reading' | 'finished';
          started_at: string | null;
          finished_at: string | null;
          rating: number | null;
          impression: string | null;
          memo: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          status: 'to_read' | 'reading' | 'finished';
          started_at?: string | null;
          finished_at?: string | null;
          rating?: number | null;
          impression?: string | null;
          memo?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          status?: 'to_read' | 'reading' | 'finished';
          started_at?: string | null;
          finished_at?: string | null;
          rating?: number | null;
          impression?: string | null;
          memo?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reading_records_book_id_fkey';
            columns: ['book_id'];
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
        ];
      };
      diary_entries: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          entry_date: string;
          memo: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          entry_date: string;
          memo: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          entry_date?: string;
          memo?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'diary_entries_book_id_fkey';
            columns: ['book_id'];
            referencedRelation: 'books';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
