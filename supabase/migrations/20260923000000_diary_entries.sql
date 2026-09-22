-- =============================================================
-- Shiori Diary Entries
-- =============================================================

-- diary_entries
-- ユーザーごとの日記メモ。読書中の本に対して1本×1日につき1件（UNIQUE制約、上書き編集）。
CREATE TABLE IF NOT EXISTS diary_entries (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id     uuid        NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  entry_date  date        NOT NULL,
  memo        text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, book_id, entry_date)
);

-- =============================================================
-- Indexes
-- =============================================================

CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_book_id ON diary_entries(book_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_date ON diary_entries(user_id, entry_date);

-- =============================================================
-- RLS
-- =============================================================

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

-- diary_entries: 自分の行のみ全操作可能
CREATE POLICY "diary_select_own"
  ON diary_entries FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "diary_insert_own"
  ON diary_entries FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "diary_update_own"
  ON diary_entries FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "diary_delete_own"
  ON diary_entries FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
