# DB Migration Skill

Supabase / PostgreSQL のマイグレーションを安全に実行します。

## 必須確認事項

### 変更前
- [ ] `docs/database.md` と整合しているか
- [ ] 既存の migration ファイルを確認したか
- [ ] RLS ポリシーは設定されているか
- [ ] インデックスは適切か
- [ ] foreign key と constraint は適切か
- [ ] rollback 可能か
- [ ] データ破壊リスクはないか

### 危険な操作（必ずユーザー確認）

以下の操作を行う場合は、実行前にユーザーの確認を得ること：

- `DROP TABLE`
- `DROP COLUMN`
- `ALTER COLUMN`（型変更）
- `UPDATE`（全件更新）
- `DELETE`（全件削除）
- RLS の無効化

## 実行手順

1. migration ファイルを作成（`supabase/migrations/YYYYMMDDHHMMSS_name.sql`）
2. ローカルで動作確認
3. RLS ポリシーを設定
4. 本番適用前にユーザー確認
5. 本番適用

## 命名規則

```
supabase/migrations/20240101000000_create_books_table.sql
```
