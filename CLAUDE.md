# CLAUDE.md

Claude Code向けのプロジェクトガイド。

---

## Project Overview

**アプリ名:** Shiori（読書記録アプリ）
**プラットフォーム:** iPhone（iOS）
**目的:** バーコードスキャンまたは書籍検索で本を登録し、読書記録を本棚として管理・振り返るアプリ。
**開発形態:** 個人開発

---

## Tech Stack

| 分類 | 技術 |
|------|------|
| アプリフレームワーク | React Native |
| 開発基盤 | Expo（最新LTS） |
| 言語 | TypeScript（strict mode） |
| 画面遷移 | Expo Router |
| 状態管理 | Zustand |
| バックエンド・DB | Supabase（PostgreSQL + Auth + RLS + Storage） |
| バーコード | Expo Camera |
| 書籍情報API | OpenBD（第一候補、フォールバックあり） |
| HTTP通信 | 標準 fetch |
| コード品質 | ESLint + Prettier |
| パッケージ管理 | npm |
| バージョン管理 | Git + GitHub |
| iOSビルド | EAS Build |

---

## Architecture

レイヤー構成の詳細は `docs/architecture.md` を参照。

```
Presentation Layer  →  app/ + components/
Application Layer   →  hooks/ + store/
Domain Layer        →  types/ + utils/
Infrastructure      →  services/ + lib/
```

**重要な原則:**
- コンポーネントから直接 Supabase を呼ばない（hooks/ または services/ を経由する）
- 書籍APIのレスポンスはそのまま使わず、Mapper で Book 型に変換する

---

## Directory Structure

```
src/
├── app/               # Expo Router（画面）
│   ├── index.tsx      # 本棚
│   ├── login.tsx
│   ├── add/
│   │   ├── index.tsx
│   │   ├── scan.tsx
│   │   └── search.tsx
│   ├── books/
│   │   └── [id].tsx
│   └── settings.tsx
├── components/        # 再利用可能なUIコンポーネント
├── hooks/             # カスタムフック（ビジネスロジック）
├── store/             # Zustand ストア
├── services/          # 外部サービス連携（Supabase、書籍API）
├── lib/               # クライアント初期化（supabase.ts等）
├── types/             # 型定義
└── utils/             # ユーティリティ関数
```

---

## Development Principles

1. 既存コードを理解してから変更する
2. 小さく変更する（一度に大きな変更をしない）
3. 不要な依存関係を追加しない
4. 過剰設計をしない
5. テスト可能なコードを書く
6. `any` を原則禁止とする
7. コンポーネントから直接 Supabase を呼ばない
8. RLS を必ず有効化する
9. APIキーをソースコードにハードコードしない

---

## Development Workflow

1. **要件確認** — `docs/requirements.md` と `CLAUDE.md` を確認する
2. **関連ドキュメント確認** — `docs/` 配下の該当ドキュメントを確認する
3. **関連コード調査** — 既存の実装・型定義・サービスを調査する
4. **影響範囲確認** — 変更が及ぶファイル・機能を特定する
5. **実装計画作成** — 実装ステップを整理する
6. **ユーザー確認** — 計画をユーザーに提示して承認を得る
7. **実装** — 小さく段階的に実装する
8. **テスト実行** — `npm test` を実行する
9. **型チェック** — `npx tsc --noEmit` を実行する
10. **lint** — `npx eslint .` を実行する
11. **コードレビュー** — `/code-review` スキルでレビューする
12. **ドキュメント更新** — 必要に応じて `docs/` を更新する
13. **進捗ファイルを必ず更新する**（下記「Progress Tracking」参照）

---

## Progress Tracking（必須）

**何か作業をしたら、必ずセッション終了前に以下を更新すること。省略禁止。**

### tasks.md（作業単位で更新）

- タスクを開始したら `[ ]` → `- [ ] 🔄 進行中` に変更
- タスクが完了したら `[ ]` → `[x]` に変更して「完了」セクションに移動
- 新しいタスクが発生したら適切なセクションに追加

### progress.md（フェーズ変化時に更新）

- フェーズのステータスが変わったら表のアイコンを更新（⬜ → 🔄 → ✅）
- フェーズが完了したら「完了したこと」を記載
- 「最終更新」日付を更新

### CHANGELOG.md（毎回必ず更新）

セッションの作業内容を先頭に追記する。フォーマット：

```markdown
## YYYY-MM-DD

### やったこと
- 具体的にやったこと

### 変更ファイル
- `path/to/file`（作成 / 変更 / 削除）
```

> **重要:** 3つのファイルの更新はセッション終了の条件。更新せずに終了しないこと。

---

## Architecture Change Policy

以下の技術・方針はユーザーの承認なしに変更を禁止する。

- フレームワーク（React Native / Expo）
- DB（Supabase / PostgreSQL）
- 認証方式（Supabase Auth）
- 状態管理（Zustand）
- ナビゲーション（Expo Router）
- バーコード（Expo Camera）
- 書籍API（OpenBD系）

変更が必要と判断した場合は、以下を説明してユーザーの承認を得ること。

1. なぜ変更が必要か
2. 現状の問題点
3. 検討した代替案
4. 推奨する案
5. 影響範囲

---

## Key Constraints

- `any` を原則禁止（やむを得ない場合は `// eslint-disable-next-line @typescript-eslint/no-explicit-any` と理由のコメントを付ける）
- コンポーネントから直接 Supabase を呼ばない（`hooks/` または `services/` を経由すること）
- RLS を必ず有効化する（全テーブル）
- Supabase `service_role` key をクライアントサイドに露出させない
- APIキーをソースコードにハードコードしない
- `.env` を Git にコミットしない（`.env.example` のみ管理する）

---

## References

- 要件定義書: `Input/読書記録アプリ_要件定義書.md`
- 技術選定書: `Input/読書記録アプリ_技術選定書.md`
- アーキテクチャ: `docs/architecture.md`
- DB設計: `docs/database.md`
- API仕様: `docs/api.md`
- UI設計: `docs/ui.md`
- テスト方針: `docs/testing.md`
- 開発計画: `plan.md`
- フェーズ進捗: `progress.md`
- タスク一覧: `tasks.md`
- 作業ログ: `CHANGELOG.md`
