/**
 * 認証済みユーザー情報
 */
export interface AuthUser {
  id: string;
  email: string;
}

/**
 * 読書ステータス
 * - to_read: これから読む
 * - finished: 読了
 */
export type ReadingStatus = 'to_read' | 'finished';

/**
 * 書籍情報
 * books テーブルに対応
 */
export interface Book {
  id: string;
  isbn: string;
  title: string;
  authors: string[];
  coverImage?: string;
  publisher?: string;
  publishedAt?: string;
  pageCount?: number;
  genre?: string;
  createdAt: string;
}

/**
 * 読書記録
 * reading_records テーブルに対応
 */
export interface ReadingRecord {
  id: string;
  userId: string;
  bookId: string;
  status: ReadingStatus;
  startedAt?: string;
  finishedAt?: string;
  /** 1〜5 の整数、未評価の場合は undefined */
  rating?: number;
  impression?: string;
  memo?: string;
  createdAt: string;
}

/**
 * 本棚表示用: 書籍情報 + 読書記録を結合した型
 */
export interface BookWithRecord {
  book: Book;
  record: ReadingRecord;
}

/**
 * 日記エントリ
 * diary_entries テーブルに対応。読書中の本に対する日ごとのメモ（1本×1日につき1件）
 */
export interface DiaryEntry {
  id: string;
  userId: string;
  bookId: string;
  /** 'YYYY-MM-DD' */
  entryDate: string;
  memo: string;
  createdAt: string;
}

/**
 * 本棚の表示モード
 */
export type BookshelfDisplayMode = 'list' | 'grid';

/**
 * 書籍 API のレスポンスから Book 型へ変換するためのマッパーインターフェース
 * 各 API 実装クラスでこれを実装する
 */
export interface BookApiMapper<T> {
  toBook(response: T): Book;
  toBooks(response: T[]): Book[];
}
