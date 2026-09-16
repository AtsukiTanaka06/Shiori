# Progress

プロジェクト全体の進捗サマリー。フェーズ単位で管理する。
詳細なタスクは `tasks.md` を参照。作業ログは `CHANGELOG.md` を参照。

---

## 現在のフェーズ

**Phase 6: 本の詳細・編集・削除**（未着手）

---

## フェーズ一覧

| フェーズ | 内容 | ステータス |
|---------|------|-----------|
| Phase 0 | Claude Code 開発基盤構築 | ✅ 完了 |
| Phase 1 | Expo プロジェクトセットアップ | ✅ 完了 |
| Phase 2 | 認証（Supabase Auth / Sign in with Apple） | ✅ 完了 |
| Phase 3 | DB 構築（テーブル・RLS・CRUD） | ✅ 完了 |
| Phase 4 | 書籍登録（バーコード・検索・書籍 API） | ✅ 完了 |
| Phase 5 | 本棚（一覧・フィルター・表示切り替え） | ✅ 完了 |
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

## Phase 1: Expo プロジェクトセットアップ ✅

**完了日:** 2026-08-10

### 完了したこと

- Expo 57 + Expo Router + TypeScript strict プロジェクト作成
- ESLint / Prettier / Jest 設定
- 画面スケルトン 9画面（`app/`）作成
- `src/` ディレクトリ構成（components / hooks / store / services / lib / types / utils）
- 共通型定義（`src/types/index.ts`）
- GitHub リポジトリ作成・初回プッシュ
- Supabase プロジェクト作成・`.env.local` に設定
- `npm run typecheck` / `npm run lint` エラーなし

### 残課題（ブロッカーではない）

- `npx expo start` でアプリが起動する
- `npx tsc --noEmit` がエラーなしで通る
- `npx eslint .` がエラーなしで通る
- GitHub にプッシュ済み

---

## Phase 2: 認証 ✅

**完了日:** 2026-08-12

### 完了したこと

- `@supabase/supabase-js` / `@react-native-async-storage/async-storage` インストール
- Supabase クライアント初期化（`src/lib/supabase.ts`）
- `AuthUser` 型定義（`src/types/index.ts`）
- Zustand 認証ストア（`src/store/authStore.ts`）
- 認証サービス（`src/services/authService.ts`）— signIn / signUp / signOut
- 認証カスタムフック（`src/hooks/useAuth.ts`）
- ログイン画面（`app/login.tsx`）— メール + パスワード、ログイン/新規登録切り替え
- 認証ガード（`app/_layout.tsx`）— セッション監視・未ログイン時リダイレクト
- ログアウト（`app/settings.tsx`）

---

## Phase 3: DB 構築 ✅

**完了日:** 2026-08-14

### 完了したこと

- Migration SQL 作成（books・reading_records・RLS・インデックス）
- `src/types/database.ts`（Supabase Database 型定義）
- `src/lib/supabase.ts` 型安全化（`createClient<Database>`）
- `src/services/bookService.ts`（findByIsbn / findById / create / findOrCreate）
- `src/services/recordService.ts`（findByUserId / findByUserAndBook / create / update / delete）

### 残作業（手動）
- Supabase SQL Editor で `supabase/migrations/20260814000000_initial_schema.sql` を実行

---

## Phase 4: 書籍登録 ✅

**完了日:** 2026-08-15

### 完了したこと
- `src/services/bookApiService.ts`（OpenBD + Google Books フォールバック）
- `src/store/bookRegistrationStore.ts`（登録フロー一時状態）
- `src/hooks/useBookRegistration.ts`（ISBN取得・登録・二重登録チェック）
- 登録方法選択・バーコードスキャン・テキスト検索・書籍確認登録の4画面実装

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

_最終更新: 2026-09-16 (Expo SDK 54 → 57 に再アップグレード。実機 Expo Go の SDK 57 対応版更新を確認済み)_
