-- =============================================================
-- Fix: books 削除時の CASCADE が他ユーザーのデータを巻き込む問題を修正
-- =============================================================
-- 背景:
-- books は全ユーザー共有リソースで、books_delete_authenticated ポリシーは
-- 任意の認証済みユーザーに books 行の削除を許可している。
-- reading_records.book_id / diary_entries.book_id が ON DELETE CASCADE だったため、
-- 1人のユーザーが共有の books 行を削除すると、他ユーザーの reading_records・
-- diary_entries まで連鎖的に削除されてしまう欠陥があった。
--
-- 対応:
-- book_id 側の外部キーを CASCADE から RESTRICT に変更する。
-- これにより、reading_records / diary_entries から参照されている books 行は
-- 削除できなくなり、他ユーザーのデータが意図せず失われることを防ぐ。
-- （user_id 側の CASCADE はアカウント削除時に必要な挙動のため変更しない）

ALTER TABLE reading_records
  DROP CONSTRAINT reading_records_book_id_fkey,
  ADD CONSTRAINT reading_records_book_id_fkey
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT;

ALTER TABLE diary_entries
  DROP CONSTRAINT diary_entries_book_id_fkey,
  ADD CONSTRAINT diary_entries_book_id_fkey
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT;
