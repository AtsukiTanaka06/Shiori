# Database Rules

## アクセス方針

- DBアクセスは `services/` または `hooks/` に集約する（コンポーネントから直接呼ばない）

## マイグレーション

- スキーマ変更は必ず `supabase/migrations/` のマイグレーションファイルで管理する
- 本番DBを直接変更しない（必ず migration を経由する）

## RLS（Row Level Security）

- RLS を必ず有効化する（すべてのテーブル）
- `service_role` key をクライアントサイドに露出させない（`anon` key のみ使用）

**基本ポリシー:**
- `reading_records`：`user_id = auth.uid()` の行のみ全操作可能
- `books`：全ユーザーが SELECT 可能。INSERT/UPDATE/DELETE は認証済みユーザーのみ

## クエリ設計

- N+1 クエリを避ける（JOIN または複数取得を適切に使う）
- 不要なデータを取得しない（`select` で必要なカラムのみ取得する）

## エラーハンドリング

- Supabase のレスポンスの `error` オブジェクトを必ず確認する
- エラーを握りつぶさない

## トランザクション

- books + reading_records の同時登録など、整合性が必要な処理はトランザクションまたは Supabase の RPC を検討する

## インデックス

適切なインデックスを設計する。少なくとも以下は必要：

- `reading_records.user_id`（本棚取得に使用）
- `reading_records.book_id`
- `books.isbn`（重複チェック・検索に使用）
