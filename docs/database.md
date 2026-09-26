# Database

## 概要

Supabase PostgreSQL を使用。

## テーブル設計

### books

書籍そのものの情報。

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| id | uuid | ✓ | PK, gen_random_uuid() |
| isbn | text | ✓ | ISBN-10 or ISBN-13 |
| title | text | ✓ | 書籍タイトル |
| authors | text[] | ✓ | 著者（複数対応） |
| cover_image | text | | 表紙画像URL |
| publisher | text | | 出版社 |
| published_at | date | | 発売日 |
| page_count | integer | | ページ数 |
| genre | text | | ジャンル |
| created_at | timestamptz | ✓ | 登録日時 |

### reading_records

ユーザーの読書記録。

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| id | uuid | ✓ | PK |
| user_id | uuid | ✓ | FK: auth.users.id |
| book_id | uuid | ✓ | FK: books.id |
| status | text | ✓ | to_read / reading / finished |
| started_at | date | | 読み始め（任意） |
| finished_at | date | | 読み終わり（任意） |
| rating | integer | | 1〜5（任意） |
| impression | text | | 感想（任意） |
| memo | text | | メモ（任意） |
| created_at | timestamptz | ✓ | 登録日時 |

### diary_entries

読書中の本に対する日ごとのメモ（日記）。

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| id | uuid | ✓ | PK |
| user_id | uuid | ✓ | FK: auth.users.id |
| book_id | uuid | ✓ | FK: books.id |
| entry_date | date | ✓ | メモの対象日 |
| memo | text | ✓ | メモ本文 |
| created_at | timestamptz | ✓ | 登録日時 |

`UNIQUE (user_id, book_id, entry_date)` — 1本×1日につき1件、上書き編集（upsert）で管理する。

## リレーション

```
auth.users (Supabase管理)
    │ 1:N              │ 1:N
    ▼                  ▼
reading_records    diary_entries
    │ N:1               │ N:1
    ▼                   ▼
books  ◀──────────────────
```

## RLS方針

- **books**: 全ユーザーが SELECT 可能。INSERT/UPDATE/DELETE は認証済みユーザー（書籍情報は共有リソースとして管理）
- **reading_records**: `user_id = auth.uid()` の行のみ全操作可能
- **diary_entries**: `user_id = auth.uid()` の行のみ全操作可能

## インデックス

- `reading_records.user_id`（本棚取得に使用）
- `reading_records.book_id`
- `books.isbn`（重複チェック・検索に使用）
- `diary_entries.user_id`
- `diary_entries.book_id`
- `diary_entries.(user_id, entry_date)`（カレンダー日別ビュー取得に使用）

## マイグレーション

`supabase/migrations/` に SQL ファイルで管理。

## Open Questions

- books テーブルの重複 ISBN の扱い（同じ ISBN を複数ユーザーが登録する場合の共有戦略）
- 表紙画像を Supabase Storage に保存するか、API の URL をそのまま保存するか
- `reading_records.status` の DB型（text vs enum）
- アカウント削除時のデータ削除戦略（CASCADE vs アプリ側制御）
