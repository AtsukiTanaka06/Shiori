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

- [x] 本棚画面 — リスト表示（`app/(tabs)/bookshelf.tsx`）
- [x] 本棚画面 — カバーグリッド表示
- [x] 表示切り替え（リスト / グリッド）
- [x] ステータスフィルター（すべて / これから / 読了）
- [x] `bookshelfStore` 実装（Zustand）

### Phase 6 — 本の詳細・編集

- [x] 詳細画面（`app/books/[id].tsx`）— 書籍情報・読書記録・日記メモ表示（日記追加機能の一部として実装）
- [x] 編集画面（`app/books/[id]/edit.tsx`, `src/hooks/useBookEdit.ts`）— ステータス・評価・感想・メモの編集
- [x] 削除（確認ダイアログ付き）— 読書記録と日記メモを削除（`diaryService.deleteByBookId`）
- [x] 実機/シミュレータでの動作確認（編集→保存→詳細画面に反映・削除→本棚から消える）

### 日記機能（本棚とは別軸の追加機能）

- [x] `diary_entries` テーブル作成（migration）
- [x] RLS ポリシー設定（`diary_entries`）
- [x] インデックス設定（`user_id`, `book_id`, `(user_id, entry_date)`）
- [x] `DiaryEntry` 型定義
- [x] `diaryService.ts`（findByBookId / findByUserAndDate / upsert）
- [x] `isReadingOnDate` ユーティリティ + unit test
- [x] `useDiary` フック（カレンダー日別ビュー用）
- [x] `useBookDetail` フック（本の詳細画面用）
- [x] タブナビゲーション新設（`app/(tabs)/_layout.tsx`、本棚 ⇄ カレンダー）
- [x] `app/index.tsx` → `app/(tabs)/index.tsx` に移動
- [x] カレンダー画面（`app/(tabs)/diary.tsx`）— 日別の読書中リスト・メモ入力モーダル
- [x] 本の詳細画面に日記セクション追加
- [x] `@expo/vector-icons` / `expo-font` / `react-native-calendars` 追加
- [x] アプリ起動時のホーム画面をカレンダーに変更（`app/(tabs)/index.tsx` ⇄ `bookshelf.tsx` を入れ替え）
- [x] `diary_entries` migration を Supabase MCP 経由で本番プロジェクトに適用（`apply_migration`、RLS有効化・テーブル作成を確認済み）
- [x] タブバーで選択中タブが分かるように改善（選択時はアイコンを塗りつぶし表示 + ラベル太字）
- [x] 実機/シミュレータでの動作確認（タブ切り替え・日付選択・メモ保存・詳細画面表示）

### ステータス「読書中」追加

- [x] `ReadingStatus` に `reading` を追加（`src/types/index.ts`, `src/types/database.ts`）
- [x] `reading_records_status_check` 制約更新 migration を作成・Supabase MCP 経由で適用済み
- [x] 登録時に「読書中」を選ぶと `started_at` を自動設定（`recordService.create` / `useBookRegistration`）
- [x] 登録画面・本棚フィルター/バッジ・本の詳細画面のUIに「読書中」を追加
- [x] `docs/requirements.md` / `docs/database.md` / `docs/ui.md` 更新
- [x] 実機/シミュレータでの動作確認（「読書中」で登録 → 本棚バッジ表示 → カレンダーに表示されること）

### Phase 7 — 設定・アカウント

- [ ] 設定画面（`app/settings.tsx`）
- [ ] アカウント削除（ユーザーデータの完全削除）

### ホームページ（LP）

- [x] `lp/index.html` / `lp/style.css` 作成（GitHub Pages 用、デザイントークン準拠）
- [x] `.github/workflows/deploy-pages.yml` 作成（`lp/` を GitHub Actions でデプロイ）
- [ ] GitHub リポジトリ設定で Pages の Source を `GitHub Actions` に変更（Settings → Pages）— ユーザー作業
- [ ] 公開後の表示確認

### Phase 8 — リリース

- [ ] EAS Build 設定（`eas.json`）
- [ ] 環境変数設定（EAS Secrets）
- [ ] Supabase の「Confirm email」を本番前に有効化（開発中はオフ）
- [ ] TestFlight 配布・動作確認
- [ ] App Store 申請

---

## 未決定・ブロッカー

- [x] 書籍 API の最終選定 → OpenBD 第一候補 + Google Books フォールバックで決定・実装済み（`bookApiService.ts`）
- [x] 表紙画像の保存方法 → Supabase Storage は使わず、API から取得した URL を `books.cover_image` に直接保存する方式に決定
- [x] `books` テーブルの重複 ISBN 戦略 → 全ユーザー共有・同一 ISBN は1行のみに決定（`bookService.findOrCreate`）
- [ ] Apple Developer Program 登録（Phase 2.5 の Sign in with Apple・Phase 8 の EAS Build/TestFlight/App Store 申請の両方をブロック中。唯一の残ブロッカー）
- [x] Node.js バージョンアップ（Nodist 経由で `22.11.0` に切り替え済み。SDK 57 ツールチェイン要件 `>=20.19.4` を満たす）
- [x] Expo SDK 57 → 54 にダウングレード（Expo Go アプリのバージョンと合わせるため）
- [x] Expo SDK 54 → 57 に再アップグレード（実機 Expo Go を SDK 57 対応版に更新後）

## 積み残しリスク（2026-09-29 計画振り返り）

- [x] 実機/シミュレータ動作確認が2件未消化（日記機能・Phase 6 編集/削除）。新機能着手より優先して消化する → 2026-10-04 に実機確認完了（「読書中」ステータス分も含め3件とも確認済み）
- [ ] Integration Test / E2E Test が未着手（`.claude/rules/testing.md` 要求）。Phase 8 前に着手を検討
- [ ] Phase 7（アカウント削除）は Phase 8 着手前に完了させる（App Store 審査要件）
- [x] `books` の DELETE が `reading_records`/`diary_entries` に `ON DELETE CASCADE` していたため、任意の認証済みユーザーが共有書籍を削除すると他ユーザーのデータまで消える問題を発見・修正済み（`book_id` 側の FK を `RESTRICT` に変更。migration: `20260929000000_restrict_books_delete_cascade.sql`、Supabase MCP経由で本番適用済み。security advisor 新規指摘なし）

---

_最終更新: 2026-10-05（LP を `lp/` ディレクトリに作成し、GitHub Actions で Pages にデプロイする構成に変更）_
