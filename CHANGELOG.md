# Changelog

Claude が作業を完了した際に追記するログ。新しいエントリは上に追加する。

フォーマット:
```
## YYYY-MM-DD

### やったこと
- 項目

### 変更ファイル
- path/to/file
```

---

## 2026-09-16 (Expo SDK 54 → SDK 57 再アップグレード)

### やったこと
- 実機の Expo Go アプリを SDK 57 対応版に更新済みであることを確認した上で再度アップグレード実施
- Node.js が SDK 57 のツールチェイン要件（`>=20.19.4`）を満たしておらず（Nodist管理下で `v20.10.0` を使用中）、`expo install --fix` が `node:util.parseEnv` 不在エラーで失敗
- Nodist で Node.js `22.11.0` を追加インストールし、グローバルに切り替え（`nodist add 22.11.0` → `nodist global 22.11.0`）
- `npm install expo@~57.0.0 --legacy-peer-deps` で Expo 本体を 54 → 57 にアップグレード（react-dom のピア依存衝突のため `--legacy-peer-deps` が必要、前回と同様）
- `npx expo install --fix` で依存パッケージを SDK 57 互換に一括更新（react-dom ピア依存衝突により追加で `npm install --legacy-peer-deps` が必要だった）
- `app/add/scan.tsx` の `StyleSheet.absoluteFillObject`（2箇所）を `StyleSheet.absoluteFill` に修正（RN 0.86 で `absoluteFillObject` が型定義から削除されているため。前回アップグレード時と同じ修正）
- `jest-expo@57` が新たに要求する peer dependency `@react-native/jest-preset@^0.86.3` を追加インストール（未対応のまま `npm test` するとプリセットエラーで失敗）
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認
- `npx expo-doctor` で SDK 関連のチェックはすべて通過（アセットファイル不在の既存警告のみ、SDK 変更とは無関係）
- `npm test` はプリセットエラー解消を確認（テストファイル自体が未作成のため 0 件、既存の状態）

### 注意点
- Node.js は Nodist で `20.10.0` と `22.11.0` の2バージョンが共存。現在のグローバル設定は `22.11.0`
- `metro@0.84.x` 等一部パッケージは Node `^22.13.0` を要求しており、`22.11.0` では `EBADENGINE` 警告が出るが動作に支障はなし

### アップグレード後バージョン
- expo: ~57.0.0（インストール実体 57.0.23）
- expo-router: ~57.0.21
- expo-camera: ~57.0.5
- expo-constants: ~57.0.18
- expo-linking: ~57.0.10
- expo-status-bar: ~57.0.1
- react: 19.2.3
- react-native: 0.86.3
- react-native-safe-area-context: ~5.7.0
- react-native-screens: ~4.26.0
- jest-expo: ~57.0.5
- eslint-config-expo: ~57.0.2
- typescript: ~6.0.3
- @react-native/jest-preset: ^0.86.3（新規追加）

### 変更ファイル
- `package.json`（変更）
- `package-lock.json`（変更）
- `app/add/scan.tsx`（変更）

---

## 2026-09-12 (Expo SDK 57 → SDK 54 ダウングレード)

### やったこと
- Expo Go アプリで実機接続時に「リクエストがタイムアウトしました」が発生（インストール済み Expo Go が SDK 54 対応版のため、プロジェクトの SDK 57 と不一致だったことが原因）
- `npx expo install expo@^54.0.0` で Expo 本体を 57 → 54 に戻す
- `npx expo install --fix` で依存パッケージ一覧を SDK 54 互換バージョンに揃え、`package.json` を手動調整（`eslint-config-expo` `~10.0.0`、`jest-expo` `~54.0.18`、`typescript` `~5.9.2`、`@types/react` `~19.1.10`）
- `react-test-renderer` を `19.1.0` に明示 pin してピア依存衝突（`@testing-library/react-native` 経由）を解消
- `node_modules` / `package-lock.json` を削除してクリーン再インストール
- `app.json` の `plugins` から `expo-status-bar` を削除（config plugin を持たないパッケージで、Node の型ストリッピング制限により `expo config` / `expo-doctor` がクラッシュしていた）
- `app/add/scan.tsx` の `StyleSheet.absoluteFill` スプレッドを `StyleSheet.absoluteFillObject` に修正（型エラー再発。SDK54 の型定義では `absoluteFill` はスプレッド不可のスタイルID型）
- `npx tsc --noEmit` / `npx eslint .` / `npx expo-doctor` でエラーなしを確認

### ダウングレード後バージョン
- expo: 54.0.27
- expo-router: ~6.0.24
- expo-camera: ~17.0.10
- expo-constants: ~18.0.14
- expo-linking: ~8.0.12
- expo-status-bar: ~3.0.9
- react: 19.1.0
- react-native: 0.81.5
- react-native-safe-area-context: ~5.6.0
- react-native-screens: ~4.16.0
- jest-expo: ~54.0.18

### 変更ファイル
- `package.json`（変更）
- `package-lock.json`（変更）
- `app.json`（変更）
- `app/add/scan.tsx`（変更）

---

## 2026-09-12 (Expo SDK 54 → SDK 57 アップグレード)

### やったこと
- `npx expo install expo@~57.0.0` で Expo 本体を 54 → 57 にアップグレード
- `npx expo install --fix` で依存パッケージを SDK 57 互換に一括更新
- `npm install --legacy-peer-deps` で react-dom のピア依存競合を解消
- `app/add/scan.tsx` の `StyleSheet.absoluteFillObject` → `StyleSheet.absoluteFill` に修正（RN 0.86 で型定義から削除）
- `eslint.config.js` で SDK 57 の `eslint-config-expo` が新たに追加した `react-hooks/set-state-in-effect` / `react-hooks/refs` ルールをオフに設定（データフェッチで useEffect 内から setState を呼ぶ標準パターンが必要なため）
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認
- `npx expo-doctor` で SDK 関連のチェックはすべて通過（アセットファイル不在の既存警告のみ）

### アップグレード後バージョン
- expo: 57.0.22
- expo-router: 57.0.21（v6 → v7 相当）
- expo-camera: 57.0.5
- expo-constants: 57.0.18
- expo-linking: 57.0.10
- expo-status-bar: 57.0.1
- react: 19.2.3
- react-native: 0.86.3
- react-native-safe-area-context: 5.7.0
- react-native-screens: 4.26.2
- jest-expo: 57.0.5
- eslint-config-expo: 57.0.2
- typescript: 6.0.3

### 変更ファイル
- `package.json`（変更）
- `package-lock.json`（変更）
- `app/add/scan.tsx`（変更: absoluteFillObject → absoluteFill）
- `eslint.config.js`（変更: set-state-in-effect / refs ルールをオフ）

---

## 2026-08-29 (Phase 5 完了)

### やったこと
- `src/store/bookshelfStore.ts` 実装（items・filter・displayMode）
- `src/hooks/useBookshelf.ts` 実装（useFocusEffect でフォーカス時再取得）
- `app/index.tsx` 本棚画面実装
  - リスト表示（表紙・タイトル・著者・ステータスバッジ）
  - グリッド表示（3列・表紙メイン）
  - 表示切り替えボタン（リスト ⇔ グリッド）
  - フィルタータブ（すべて / これから / 読了）
  - 空状態メッセージ
  - FAB（右下・本を追加）
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認

### 変更・作成ファイル
- `src/store/bookshelfStore.ts`（新規）
- `src/hooks/useBookshelf.ts`（新規）
- `app/index.tsx`（変更）
- `tasks.md`（更新）
- `progress.md`（更新）

---

## 2026-08-15 (Phase 4 完了)

### やったこと
- `expo-camera` インストール（SDK 54 互換）
- `src/services/bookApiService.ts` 実装（OpenBD + Google Books フォールバック）
- `src/store/bookRegistrationStore.ts` 実装（登録フロー一時状態）
- `src/hooks/useBookRegistration.ts` 実装（ISBN取得・登録・二重登録チェック）
- `app/add/index.tsx` 実装（登録方法選択画面）
- `app/add/scan.tsx` 実装（バーコードスキャン・カメラ許可・スキャンウィンドウUI）
- `app/add/search.tsx` 実装（テキスト検索・結果一覧）
- `app/add/register.tsx` 実装（書籍確認・ステータス選択・Supabase登録）
- `app/index.tsx` に「本を追加」ボタン追加
- `.env.example` 更新（`EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY`）
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認

### 変更・作成ファイル
- `src/services/bookApiService.ts`（新規）
- `src/store/bookRegistrationStore.ts`（新規）
- `src/hooks/useBookRegistration.ts`（新規）
- `app/add/index.tsx`（変更）
- `app/add/scan.tsx`（変更）
- `app/add/search.tsx`（変更）
- `app/add/register.tsx`（変更）
- `app/index.tsx`（変更）
- `.env.example`（変更）
- `tasks.md`（更新）
- `progress.md`（更新）

---

## 2026-08-14 (Phase 3 完了)

### やったこと
- `supabase/migrations/20260814000000_initial_schema.sql` 作成（books・reading_records テーブル・RLS・インデックス）
- `src/types/database.ts` 作成（Supabase Database 型定義）
- `src/lib/supabase.ts` 更新（Database 型を渡して型安全化）
- `src/services/bookService.ts` 実装（findByIsbn / findById / create / findOrCreate）
- `src/services/recordService.ts` 実装（findByUserId / findByUserAndBook / create / update / delete）
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認

### 次の手順（手動）
- Supabase SQL Editor で `supabase/migrations/20260814000000_initial_schema.sql` を実行する

### 変更・作成ファイル
- `supabase/migrations/20260814000000_initial_schema.sql`（新規）
- `src/types/database.ts`（新規）
- `src/lib/supabase.ts`（変更）
- `src/services/bookService.ts`（新規）
- `src/services/recordService.ts`（新規）
- `tasks.md`（更新）
- `progress.md`（更新）

---

## 2026-08-14 (デザインシステム導入)

### やったこと
- `Input/Design.md` をデザインシステムとして採用
- デザイントークンファイル作成（`src/constants/design.ts`）— Colors / Spacing / Radius / FontSize / Shadow
- `app/login.tsx` をデザインシステムに準拠（ivory背景・sage500ボタン・角丸12pt・トークン参照）
- `app/settings.tsx` をデザインシステムに準拠（ivory背景・muted coral ログアウト）
- `app/index.tsx` のヘッダーをデザインシステムに準拠（ivory・sage文字色）
- `docs/ui.md` 更新（デザイントークン概要・方針追記）
- `.claude/rules/react.md` 更新（デザインシステム参照ルール追加）

### 変更・作成ファイル
- `src/constants/design.ts`（新規）
- `app/login.tsx`（変更）
- `app/settings.tsx`（変更）
- `app/index.tsx`（変更）
- `docs/ui.md`（変更）
- `.claude/rules/react.md`（変更）

---

## 2026-08-12 (Expo SDK 54 ダウングレード)

### やったこと
- Expo Go 対応のため Expo SDK 57 → SDK 54 にダウングレード
- SDK 54 互換バージョンに一括更新
  - expo: ~54.0.0, expo-router: ~6.0.24, react-native: 0.81.5
  - typescript: ~5.9.2, jest-expo: ~54.0.17, eslint-config-expo: ~10.0.0
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認

### 変更ファイル
- `package.json`（変更）
- `package-lock.json`（変更）

---

## 2026-08-12 (依存関係更新)

### やったこと
- Expo SDK 57 推奨バージョンへ依存関係を更新（`ERESOLVE` peer dependency 競合を解消）
- `@testing-library/react-native` を 12.x → 13.x に更新（`expo-router` の peer 要件対応）
- `@react-native-async-storage/async-storage` を 3.1.1 → 2.2.0 に修正（SDK 57 互換）
- `expo`, `expo-constants`, `expo-router`, `eslint-config-expo`, `jest-expo` を最新パッチに更新
- `npm run typecheck` エラーなし確認

### 変更ファイル
- `package.json`（変更）
- `package-lock.json`（変更）

### 注意
- Node.js v20.10.0 は Expo SDK 57 の要求（>=20.19.4）を満たしていない。`npx expo install --check` 等が動作しないため、Node.js の更新を推奨

---

## 2026-08-12 (Phase 2 完了)

### やったこと
- `@supabase/supabase-js` / `@react-native-async-storage/async-storage` インストール
- Supabase クライアント初期化（`src/lib/supabase.ts`）
- `AuthUser` 型追加（`src/types/index.ts`）
- Zustand 認証ストア実装（`src/store/authStore.ts`）
- 認証サービス実装（`src/services/authService.ts`）— signIn / signUp / signOut / getSession
- 認証カスタムフック実装（`src/hooks/useAuth.ts`）
- ログイン画面実装（`app/login.tsx`）— メール + パスワード、ログイン/新規登録切り替え
- ルートレイアウトに認証ガード追加（`app/_layout.tsx`）— セッション監視・リダイレクト
- 設定画面にログアウト機能追加（`app/settings.tsx`）
- `npx tsc --noEmit` / `npx eslint .` エラーなし確認

### 変更・作成ファイル
- `src/lib/supabase.ts`（新規）
- `src/types/index.ts`（変更: AuthUser 型追加）
- `src/store/authStore.ts`（新規）
- `src/services/authService.ts`（新規）
- `src/hooks/useAuth.ts`（新規）
- `app/login.tsx`（変更: 実装）
- `app/_layout.tsx`（変更: 認証ガード追加）
- `app/settings.tsx`（変更: ログアウト追加）
- `package.json`（変更: パッケージ追加）
- `tasks.md`（更新）
- `progress.md`（更新）

---

## 2026-08-10 (Phase 1 完了)

### やったこと
- GitHub リポジトリ作成・初回コミット・プッシュ
- Supabase プロジェクト作成
- `.env.local` に Supabase 認証情報を設定
- `.env.example` をプレースホルダー値に復元（実際の値が誤って記載されていたのを修正）
- Phase 1 の全タスク完了、progress.md / tasks.md を更新

### 変更ファイル
- `.env.local`（新規 — Git 管理外）
- `.env.example`（修正: プレースホルダーに戻す）
- `tasks.md`（更新: Phase 1 完了）
- `progress.md`（更新: Phase 1 ✅ 完了、現在フェーズを Phase 2 に更新）

---

## 2026-08-10 (Phase 1 セットアップ)

### やったこと
- Phase 1 開始: Expo プロジェクトのセットアップを実施
- Expo 57 + Expo Router + TypeScript (strict) 構成でプロジェクトを作成
- ESLint / Prettier / Jest の設定を追加
- Expo Router に対応した画面スケルトン（9画面）を作成
- src/ ディレクトリ構成（components / hooks / store / services / lib / types / utils）を作成
- src/types/index.ts に Book / ReadingRecord 等の共通型定義を作成
- Node 20.10.0 と Expo 57 の互換性警告を確認（Node 20.19.4 以上を推奨）

### 注意
- Node.js を 20.19.4 以上にアップデートすることを強く推奨
- GitHub リポジトリ作成・プッシュは手動で実施が必要
- Supabase プロジェクト作成は手動で実施が必要（Phase 2 で詳細設定）

### 変更・作成ファイル
- `package.json`（新規）
- `app.json`（新規）
- `tsconfig.json`（新規）
- `babel.config.js`（新規）
- `eslint.config.js`（新規）
- `.prettierrc`（新規）
- `.prettierignore`（新規）
- `jest.config.js`（新規）
- `.gitignore`（新規）
- `README.md`（新規）
- `assets/`（新規）
- `app/_layout.tsx`（新規）
- `app/index.tsx`（新規）
- `app/login.tsx`（新規）
- `app/settings.tsx`（新規）
- `app/add/_layout.tsx`（新規）
- `app/add/index.tsx`（新規）
- `app/add/scan.tsx`（新規）
- `app/add/search.tsx`（新規）
- `app/add/register.tsx`（新規）
- `app/books/[id].tsx`（新規）
- `app/books/[id]/edit.tsx`（新規）
- `src/types/index.ts`（新規）
- `src/lib/`, `src/components/`, `src/hooks/`, `src/store/`, `src/services/`, `src/utils/`（新規）
- `docs/architecture.md`（更新: ディレクトリ構成修正）
- `tasks.md`（更新）
- `progress.md`（更新）

---

## 2026-08-10

### やったこと

- Claude Code 開発基盤を構築した
- 要件定義書・技術選定書をもとに CLAUDE.md / Rules / Skills / Agents を作成
- docs/ にアーキテクチャ・DB・API・UI・テスト設計のテンプレートを作成
- ADR（Architecture Decision Records）の仕組みを導入
- 進捗管理ファイル（tasks.md / progress.md / CHANGELOG.md）を整備
- Claude Code の Stop フックでセッション終了を自動記録するよう設定

### 作成ファイル

- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/rules/general.md`
- `.claude/rules/typescript.md`
- `.claude/rules/react.md`
- `.claude/rules/database.md`
- `.claude/rules/testing.md`
- `.claude/rules/security.md`
- `.claude/skills/feature/SKILL.md`
- `.claude/skills/ui-review/SKILL.md`
- `.claude/skills/code-review/SKILL.md`
- `.claude/skills/test/SKILL.md`
- `.claude/skills/db-migration/SKILL.md`
- `.claude/skills/release/SKILL.md`
- `.claude/agents/reviewer.md`
- `.claude/agents/tester.md`
- `.claude/agents/security-reviewer.md`
- `docs/requirements.md`
- `docs/architecture.md`
- `docs/database.md`
- `docs/api.md`
- `docs/ui.md`
- `docs/testing.md`
- `docs/decisions/README.md`
- `docs/decisions/template.md`
- `docs/decisions/ADR-001-react-native-expo.md`
- `plan.md`
- `progress.md`
- `tasks.md`
- `CHANGELOG.md`
- `.env.example`

---
<!-- session:end 2026-08-10 22:02 -->
<!-- session:end 2026-08-10 22:15 -->
<!-- session:end 2026-08-11 23:39 -->
<!-- session:end 2026-08-11 23:40 -->
<!-- session:end 2026-08-11 23:43 -->
<!-- session:end 2026-08-12 00:04 -->
<!-- session:end 2026-08-12 00:15 -->
<!-- session:end 2026-08-12 00:16 -->
<!-- session:end 2026-08-12 00:24 -->
<!-- session:end 2026-08-12 00:41 -->
<!-- session:end 2026-08-12 00:49 -->
<!-- session:end 2026-08-12 00:57 -->
<!-- session:end 2026-08-12 01:04 -->
<!-- session:end 2026-08-12 01:14 -->
<!-- session:end 2026-08-13 23:26 -->
<!-- session:end 2026-08-13 23:28 -->
<!-- session:end 2026-08-13 23:31 -->
<!-- session:end 2026-08-13 23:35 -->
<!-- session:end 2026-08-13 23:45 -->
<!-- session:end 2026-08-13 23:50 -->
<!-- session:end 2026-08-13 23:51 -->
<!-- session:end 2026-08-14 00:00 -->
<!-- session:end 2026-08-14 00:01 -->
<!-- session:end 2026-08-14 00:08 -->
<!-- session:end 2026-08-14 00:28 -->
<!-- session:end 2026-08-15 23:34 -->
<!-- session:end 2026-08-15 23:35 -->
<!-- session:end 2026-08-15 23:49 -->
<!-- session:end 2026-08-15 23:51 -->
<!-- session:end 2026-08-15 23:51 -->
<!-- session:end 2026-08-15 23:58 -->
<!-- session:end 2026-08-16 00:40 -->
<!-- session:end 2026-08-16 00:41 -->
<!-- session:end 2026-08-16 00:42 -->
<!-- session:end 2026-08-16 00:44 -->
<!-- session:end 2026-08-16 00:45 -->
<!-- session:end 2026-08-16 00:46 -->
<!-- session:end 2026-08-16 00:52 -->
<!-- session:end 2026-08-16 10:51 -->
<!-- session:end 2026-08-16 10:56 -->
<!-- session:end 2026-08-16 11:02 -->
<!-- session:end 2026-08-16 11:06 -->
<!-- session:end 2026-08-16 11:07 -->
<!-- session:end 2026-08-16 11:11 -->
<!-- session:end 2026-08-16 11:15 -->
<!-- session:end 2026-08-16 11:17 -->
<!-- session:end 2026-08-16 11:18 -->
<!-- session:end 2026-08-16 23:36 -->
<!-- session:end 2026-08-16 23:44 -->
<!-- session:end 2026-08-16 23:51 -->
<!-- session:end 2026-08-16 23:55 -->
<!-- session:end 2026-08-16 23:58 -->
<!-- session:end 2026-08-17 00:03 -->
<!-- session:end 2026-08-17 00:06 -->
<!-- session:end 2026-08-17 00:10 -->
<!-- session:end 2026-08-17 00:13 -->
<!-- session:end 2026-08-17 00:17 -->
<!-- session:end 2026-08-17 00:21 -->
<!-- session:end 2026-08-17 00:28 -->
<!-- session:end 2026-08-17 00:30 -->
<!-- session:end 2026-08-17 00:39 -->
<!-- session:end 2026-08-23 00:13 -->
<!-- session:end 2026-08-23 00:17 -->
<!-- session:end 2026-08-23 00:24 -->
<!-- session:end 2026-08-23 00:27 -->
<!-- session:end 2026-08-23 00:33 -->
<!-- session:end 2026-08-23 00:36 -->
<!-- session:end 2026-08-23 00:41 -->
<!-- session:end 2026-08-23 00:42 -->
<!-- session:end 2026-08-23 00:44 -->
<!-- session:end 2026-08-29 22:56 -->
<!-- session:end 2026-08-29 23:30 -->
<!-- session:end 2026-08-29 23:38 -->
<!-- session:end 2026-08-29 23:43 -->
<!-- session:end 2026-08-29 23:47 -->
<!-- session:end 2026-08-29 23:50 -->
<!-- session:end 2026-08-29 23:53 -->
<!-- session:end 2026-08-30 00:13 -->
<!-- session:end 2026-09-12 23:38 -->
<!-- session:end 2026-09-12 23:53 -->
<!-- session:end 2026-09-12 23:55 -->
<!-- session:end 2026-09-12 23:56 -->
<!-- session:end 2026-09-12 23:57 -->
<!-- session:end 2026-09-13 00:20 -->
<!-- session:end 2026-09-13 00:23 -->
<!-- session:end 2026-09-13 11:46 -->
<!-- session:end 2026-09-13 11:49 -->
<!-- session:end 2026-09-13 11:50 -->
<!-- session:end 2026-09-16 23:26 -->
<!-- session:end 2026-09-16 23:30 -->
<!-- session:end 2026-09-16 23:30 -->
<!-- session:end 2026-09-16 23:45 -->
