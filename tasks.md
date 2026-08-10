# Tasks

チェックボックス形式のタスク管理ファイル。
Claude が作業を完了したら即座に `[x]` に更新する。

---

## 現在のスプリント: Phase 1 — Expo プロジェクトセットアップ

### 進行中

_なし_

### 未着手

- [ ] GitHub リポジトリ作成・初回プッシュ
- [ ] Supabase プロジェクト作成

### 完了

- [x] Expo プロジェクト作成（`npx create-expo-app`）
- [x] TypeScript 設定（`tsconfig.json` strict mode）
- [x] ESLint 設定（`eslint.config.js`）
- [x] Prettier 設定（`.prettierrc`）
- [x] Expo Router 設定
- [x] 基本ディレクトリ構成作成（`src/components / hooks / store / services / lib / types / utils`）
- [x] `.gitignore` 設定
- [x] `README.md` 作成

---

## バックログ（将来のスプリント）

### Phase 2 — 認証

- [ ] Supabase Auth 設定
- [ ] Sign in with Apple の実装
- [ ] ログイン画面
- [ ] セッション管理（`authStore`）
- [ ] ログアウト
- [ ] 認証ガード（未ログイン時のリダイレクト）

### Phase 3 — DB 構築

- [ ] `books` テーブル作成（migration）
- [ ] `reading_records` テーブル作成（migration）
- [ ] RLS ポリシー設定（`reading_records`）
- [ ] RLS ポリシー設定（`books`）
- [ ] インデックス設定（`user_id`, `isbn`）
- [ ] Supabase クライアント初期化（`lib/supabase.ts`）
- [ ] CRUD サービス実装（`services/bookService.ts`, `services/recordService.ts`）

### Phase 4 — 書籍登録

- [ ] 書籍 API クライアント実装（OpenBD 評価 → 採用判断）
- [ ] API レスポンス → `Book` 型への Mapper 実装
- [ ] バーコードスキャン画面（`app/add/scan.tsx`）
- [ ] 書籍検索画面（`app/add/search.tsx`）
- [ ] 書籍情報・登録画面（`app/add/register.tsx`）
- [ ] 二重登録チェック

### Phase 5 — 本棚

- [ ] 本棚画面 — リスト表示（`app/index.tsx`）
- [ ] 本棚画面 — カバーグリッド表示
- [ ] 表示切り替え（リスト / グリッド）
- [ ] ステータスフィルター（すべて / これから / 読了）
- [ ] `bookshelfStore` 実装（Zustand）

### Phase 6 — 本の詳細・編集

- [ ] 詳細画面（`app/books/[id].tsx`）
- [ ] 編集画面
- [ ] 削除（確認ダイアログ付き）

### Phase 7 — 設定・アカウント

- [ ] 設定画面（`app/settings.tsx`）
- [ ] アカウント削除（ユーザーデータの完全削除）

### Phase 8 — リリース

- [ ] EAS Build 設定（`eas.json`）
- [ ] 環境変数設定（EAS Secrets）
- [ ] TestFlight 配布・動作確認
- [ ] App Store 申請

---

## 未決定・ブロッカー

- [ ] 書籍 API の最終選定（OpenBD vs Google Books API 等）— Phase 4 開始前に決定必須
- [ ] 表紙画像の保存方法（Supabase Storage vs API URL 直接参照）
- [ ] `books` テーブルの重複 ISBN 戦略（共有 vs ユーザーごとに作成）
- [ ] Apple Developer Program 登録（EAS Build に必要）
- [ ] ⚠️ Node.js バージョンアップ（20.10.0 → 20.19.4 以上推奨）— Expo 57 / RN 0.86.2 の動作保証に必要

---

_最終更新: 2026-08-10_
