# Tasks

チェックボックス形式のタスク管理ファイル。
Claude が作業を完了したら即座に `[x]` に更新する。

---

## 現在のスプリント: Phase 1 — Expo プロジェクトセットアップ

### 進行中

_なし_

### 未着手

_なし_

### 完了

- [x] Expo プロジェクト作成（`npx create-expo-app`）
- [x] TypeScript 設定（`tsconfig.json` strict mode）
- [x] ESLint 設定（`eslint.config.js`）
- [x] Prettier 設定（`.prettierrc`）
- [x] Expo Router 設定
- [x] 基本ディレクトリ構成作成（`src/components / hooks / store / services / lib / types / utils`）
- [x] `.gitignore` 設定
- [x] `README.md` 作成
- [x] GitHub リポジトリ作成・初回プッシュ
- [x] Supabase プロジェクト作成
- [x] `.env.local` に認証情報を設定（`.env.example` はプレースホルダーのまま維持）

---

## バックログ（将来のスプリント）

### Phase 2 — 認証

- [x] Supabase Auth 設定
- [x] ログイン画面（メール + パスワード）
- [x] セッション管理（`authStore`）
- [x] ログアウト
- [x] 認証ガード（未ログイン時のリダイレクト）

### Phase 2.5 — Sign in with Apple（後回し）

- [ ] Apple Developer Program 登録
- [ ] App ID / Service ID / Key 設定
- [ ] Sign in with Apple の実装
- [ ] Supabase Auth に Apple プロバイダー追加

### Phase 3 — DB 構築

- [x] `books` テーブル作成（migration）
- [x] `reading_records` テーブル作成（migration）
- [x] RLS ポリシー設定（`reading_records`）
- [x] RLS ポリシー設定（`books`）
- [x] インデックス設定（`user_id`, `isbn`）
- [x] Supabase クライアント初期化（`lib/supabase.ts`）
- [x] CRUD サービス実装（`services/bookService.ts`, `services/recordService.ts`）
- [x] Supabase SQL Editor で migration を実行（手動）

### Phase 4 — 書籍登録

- [x] 書籍 API クライアント実装（OpenBD + Google Books フォールバック）
- [x] API レスポンス → `Book` 型への Mapper 実装
- [x] バーコードスキャン画面（`app/add/scan.tsx`）
- [x] 書籍検索画面（`app/add/search.tsx`）
- [x] 書籍情報・登録画面（`app/add/register.tsx`）
- [x] 二重登録チェック

### Phase 5 — 本棚

- [x] 本棚画面 — リスト表示（`app/index.tsx`）
- [x] 本棚画面 — カバーグリッド表示
- [x] 表示切り替え（リスト / グリッド）
- [x] ステータスフィルター（すべて / これから / 読了）
- [x] `bookshelfStore` 実装（Zustand）

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
- [ ] Supabase の「Confirm email」を本番前に有効化（開発中はオフ）
- [ ] TestFlight 配布・動作確認
- [ ] App Store 申請

---

## 未決定・ブロッカー

- [ ] 書籍 API の最終選定（OpenBD vs Google Books API 等）— Phase 4 開始前に決定必須
- [ ] 表紙画像の保存方法（Supabase Storage vs API URL 直接参照）
- [ ] `books` テーブルの重複 ISBN 戦略（共有 vs ユーザーごとに作成）
- [ ] Apple Developer Program 登録（EAS Build に必要）
- [x] Node.js バージョンアップ（v24.19.0 に更新済み）
- [x] Expo SDK 57 → 54 にダウングレード（Expo Go アプリのバージョンと合わせるため）

---

_最終更新: 2026-09-12 (Expo SDK 54 にダウングレード)_
