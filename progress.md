# Progress

プロジェクト全体の進捗サマリー。フェーズ単位で管理する。
詳細なタスクは `tasks.md` を参照。作業ログは `CHANGELOG.md` を参照。

---

## 現在のフェーズ

**Phase 1: Expo プロジェクトセットアップ**（未着手）

---

## フェーズ一覧

| フェーズ | 内容 | ステータス |
|---------|------|-----------|
| Phase 0 | Claude Code 開発基盤構築 | ✅ 完了 |
| Phase 1 | Expo プロジェクトセットアップ | 🔄 進行中 |
| Phase 2 | 認証（Supabase Auth / Sign in with Apple） | ⬜ 未着手 |
| Phase 3 | DB 構築（テーブル・RLS・CRUD） | ⬜ 未着手 |
| Phase 4 | 書籍登録（バーコード・検索・書籍 API） | ⬜ 未着手 |
| Phase 5 | 本棚（一覧・フィルター・表示切り替え） | ⬜ 未着手 |
| Phase 6 | 本の詳細・編集・削除 | ⬜ 未着手 |
| Phase 7 | 設定・アカウント削除 | ⬜ 未着手 |
| Phase 8 | リリース（EAS Build・TestFlight・App Store） | ⬜ 未着手 |

**凡例:** ✅ 完了 / 🔄 進行中 / ⬜ 未着手 / 🚫 ブロック中

---

## Phase 0: Claude Code 開発基盤構築 ✅

**完了日:** 2026-08-10

### 完了したこと

- 要件定義書・技術選定書のレビュー
- プロジェクト構成設計
- `CLAUDE.md` 作成（Claude Code メインガイド）
- `.claude/rules/` 作成（6 ファイル: general / typescript / react / database / testing / security）
- `.claude/skills/` 作成（6 スキル: feature / ui-review / code-review / test / db-migration / release）
- `.claude/agents/` 作成（3 エージェント: reviewer / tester / security-reviewer）
- `.claude/settings.json` 設定（パーミッション・フック）
- `docs/` 作成（requirements / architecture / database / api / ui / testing）
- `docs/decisions/` 作成（ADR テンプレート・ADR-001）
- `plan.md` 作成
- `progress.md` 作成（本ファイル）
- `tasks.md` 作成
- `CHANGELOG.md` 作成
- `.env.example` 作成

---

## Phase 1: Expo プロジェクトセットアップ 🔄

**開始予定:** 次回セッション

### やること

- Expo プロジェクト作成
- TypeScript / ESLint / Prettier 設定
- Expo Router 設定
- 基本ディレクトリ構成
- GitHub リポジトリ設定
- Supabase プロジェクト作成

### 完了条件

- `npx expo start` でアプリが起動する
- `npx tsc --noEmit` がエラーなしで通る
- `npx eslint .` がエラーなしで通る
- GitHub にプッシュ済み

---

## Phase 2: 認証 ⬜

_Phase 1 完了後に詳細化_

---

## Phase 3: DB 構築 ⬜

_Phase 2 完了後に詳細化_

---

## Phase 4: 書籍登録 ⬜

_Phase 3 完了後に詳細化_
**注意:** 書籍 API（OpenBD 等）の最終選定が必要（ブロッカー）

---

## Phase 5〜8 ⬜

_順次詳細化_

---

## ブロッカー

| 項目 | 影響フェーズ | 対応 |
|------|------------|------|
| 書籍 API の最終選定 | Phase 4 | Phase 4 開始前に OpenBD を評価して決定 |
| 表紙画像の保存方法 | Phase 3–4 | 設計時に決定 |
| `books` テーブルの重複 ISBN 戦略 | Phase 3 | DB 設計時に決定 |
| Apple Developer Program 登録 | Phase 8 | リリース前に登録 |

---

_最終更新: 2026-08-10 (Phase 1 開始)_
