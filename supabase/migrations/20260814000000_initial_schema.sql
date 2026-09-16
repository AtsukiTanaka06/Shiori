-- =============================================================
-- Shiori Initial Schema
-- =============================================================

-- books
-- 全ユーザー共有リソース。同じ ISBN は1行のみ。
CREATE TABLE IF NOT EXISTS books (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  isbn         text        NOT NULL UNIQUE,
  title        text        NOT NULL,
  authors      text[]      NOT NULL DEFAULT '{}',
  cover_image  text,
  publisher    text,
  published_at date,
  page_count   integer,
  genre        text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- reading_records
-- ユーザーごとの読書記録。同じユーザーが同じ本を二重登録できないよう UNIQUE 制約。
CREATE TABLE IF NOT EXISTS reading_records (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id     uuid        NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  status      text        NOT NULL CHECK (status IN ('to_read', 'finished')),
  started_at  date,
  finished_at date,
  rating      integer     CHECK (rating BETWEEN 1 AND 5),
  impression  text,
  memo        text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, book_id)
);

-- =============================================================
-- Indexes
-- =============================================================

CREATE INDEX IF NOT EXISTS idx_reading_records_user_id ON reading_records(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_records_book_id ON reading_records(book_id);
CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn);

-- =============================================================
-- RLS
-- =============================================================

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_records ENABLE ROW LEVEL SECURITY;

-- books: 全ユーザーが SELECT 可能、認証済みユーザーが INSERT/UPDATE/DELETE 可能
CREATE POLICY "books_select_all"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "books_insert_authenticated"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "books_update_authenticated"
  ON books FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "books_delete_authenticated"
  ON books FOR DELETE
  TO authenticated
  USING (true);

-- reading_records: 自分の行のみ全操作可能
CREATE POLICY "records_select_own"
  ON reading_records FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "records_insert_own"
  ON reading_records FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "records_update_own"
  ON reading_records FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "records_delete_own"
  ON reading_records FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
