# Feature Development Skill

新機能を開発するときに使用します。

## 手順

1. **要件確認**
   - `docs/requirements.md` を確認
   - `CLAUDE.md` の Development Principles を確認

2. **アーキテクチャ確認**
   - `docs/architecture.md` を確認
   - 既存の関連コードを調査

3. **DB確認**（DB変更が必要な場合）
   - `docs/database.md` を確認
   - 既存の `supabase/migrations/` を確認

4. **影響範囲分析**
   - 変更するファイルを特定
   - 影響する他の機能を確認

5. **実装計画作成**
   - 実装ステップを明確化
   - ユーザーに確認・承認を得る

6. **実装**
   - 小さく段階的に実装
   - 型安全に実装

7. **テスト**
   - 関連テストを実行
   - 必要なテストを追加

8. **型チェック**
   - `npx tsc --noEmit`

9. **lint**
   - `npx eslint .`

10. **コードレビュー**
    - `/code-review` スキルを実行

11. **ドキュメント更新**
    - 必要に応じて `docs/` を更新

12. **progress.md 更新**
    - 完了した作業を記録
