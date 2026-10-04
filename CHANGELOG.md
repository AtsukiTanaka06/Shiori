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

## 2026-10-05（GitHub Pages 用LPを作成）

### やったこと
- アプリ紹介用のランディングページを `docs/` 配下のプロジェクトドキュメントと混ざらないよう `lp/` ディレクトリに新規作成
- デザイントークン（`src/constants/design.ts` の sage/ivory/coral）に準拠した配色でヒーロー・機能紹介・aboutセクションを実装
- `lp/` は GitHub Pages の「Deploy from a branch」では `/docs` かルートしか指定できないため、GitHub Actions ワークフロー（`.github/workflows/deploy-pages.yml`）で `lp/` をデプロイする構成にした
- `tasks.md` にホームページ（LP）セクションを追加。Pages の Source を `GitHub Actions` に変更する作業はリポジトリ設定のためユーザー対応として記載

### 変更ファイル
- `lp/index.html`（新規）
- `lp/style.css`（新規）
- `.github/workflows/deploy-pages.yml`（新規）
- `tasks.md`（更新）

---

## 2026-10-04（実機/シミュレータ動作確認を完了）

### やったこと
- 積み残しだった実機/シミュレータ動作確認3件をユーザーが実施し、すべて問題なしを確認
  - Phase 6（編集・削除）: 編集→保存→詳細画面への反映、削除→本棚・カレンダーからの消去
  - 日記（カレンダー）機能: タブ切り替え・日付選択・メモ保存・詳細画面表示
  - 「読書中」ステータス: 登録時の本棚バッジ表示・カレンダー連動
- `tasks.md` / `progress.md` を更新し、Phase 6・日記機能を ✅ 完了に変更

### 変更ファイル
- `tasks.md`, `progress.md`（更新）

---

## 2026-09-29 (計画振り返り・booksテーブル削除のCASCADE問題を修正)

### やったこと
- `plan.md` を実態に合わせて全面更新（Phase 0〜5完了、Phase 6実装完了、追加機能の日記/カレンダーを反映）。旧「未決定事項」3件（書籍API・表紙画像保存方法・重複ISBN戦略）は既に実装で解決済みだったため解決済みに更新
- `tasks.md` / `progress.md` のブロッカー・未決定事項セクションを同様に更新。残ブロッカーは Apple Developer Program 登録のみと明確化
- 積み残しリスクとして「実機確認2件未消化」「Integration/E2E Test未着手」「Phase 7はPhase 8前に必須」を明記
- `.claude/agents/reviewer.md` に「画面遷移後のデータ整合性（stale state）」のチェック項目を追加（前セッションで見つけたBLOCKERの再発防止）
- `.claude/agents/security-reviewer.md` の books RLS チェック項目に、`books_delete_authenticated`（`USING (true)`）+ `ON DELETE CASCADE` の組み合わせで任意の認証済みユーザーが他ユーザーのデータを巻き込んで削除できる既知のリスクを明記
- 上記のセキュリティリスクを実際に修正: `reading_records.book_id` / `diary_entries.book_id` の外部キーを `ON DELETE CASCADE` → `ON DELETE RESTRICT` に変更する migration を作成・Supabase MCP経由で本番適用（`get_advisors` で新規指摘なしを確認。`user_id` 側の CASCADE は変更せず維持）

### 変更ファイル
- `plan.md`（全面更新）
- `tasks.md`, `progress.md`（更新）
- `.claude/agents/reviewer.md`, `.claude/agents/security-reviewer.md`（更新）
- `supabase/migrations/20260929000000_restrict_books_delete_cascade.sql`（新規）

---

## 2026-09-28 (Phase 6: 本の編集・削除画面を実装)

### やったこと
- 本の詳細画面（`app/books/[id].tsx`）に編集画面への導線（ヘッダーの編集アイコン）を追加
- 編集画面（`app/books/[id]/edit.tsx`）を実装 — ステータス（これから読む/読書中/読了）・評価（★1〜5）・感想・メモを編集し保存
- `src/hooks/useBookEdit.ts`（新規）— 編集フォームの状態管理、保存（`recordService.update`）、削除（`recordService.delete` + `diaryService.deleteByBookId`）
- 削除は確認ダイアログ（破壊的操作）付き。読書記録と紐づく日記メモを削除し、本棚に戻る
- `src/utils/resolveStatusDates.ts`（新規）— ステータス変更時に開始日・終了日を自動設定するロジックを純粋関数として切り出し、unit test を追加（`resolveStatusDates.test.ts`）
- `/code-review` によるレビューで BLOCKER 2件を検出・修正
  - 編集して保存→戻っても詳細画面が再取得されず古い表示のままだった → `useFocusEffect` でフォーカス時に `refresh()` する方式に変更（`useBookDetail.ts` の自動 `useEffect` は撤去し、呼び出し側でのフォーカス時取得に統一）
  - 削除時に日記メモ（`diary_entries`）が削除されず、同じ本を再登録すると古い日記が復活してしまう問題 → `diaryService.deleteByBookId` を追加し、削除処理に組み込み
- `npx tsc --noEmit` / `npx eslint .` / `npm run test:ci`（12 tests）すべて green

### 変更ファイル
- `app/books/[id].tsx`（変更）
- `app/books/[id]/edit.tsx`（変更・実装）
- `src/hooks/useBookEdit.ts`（新規）
- `src/hooks/useBookDetail.ts`（変更）
- `src/services/diaryService.ts`（変更）
- `src/utils/resolveStatusDates.ts`（新規）
- `src/utils/resolveStatusDates.test.ts`（新規）
- `docs/ui.md`（変更）
- `tasks.md`, `progress.md`（更新）

---

## 2026-09-23 (タブバーで選択中タブが分かるように改善)

### やったこと
- タブバー（`app/(tabs)/_layout.tsx`）で、選択中タブが `tabBarActiveTintColor`（`sage600`）の色変化だけでは分かりにくかったため視認性を改善
- 選択中タブはアイコンを塗りつぶし版（`calendar` / `book`）に切り替え、非選択時はアウトライン版（`calendar-outline` / `book-outline`）のまま
- ラベルも選択中は太字（`fontWeight: '700'`）にするため `tabBarLabel` を関数化
- `npx tsc --noEmit` / `npx eslint .` 確認済み

### 変更ファイル
- `app/(tabs)/_layout.tsx`（変更）

---

## 2026-09-23 (ステータスに「読書中」を追加)

### やったこと
- 読書ステータスに `reading`（読書中）を追加（従来は `to_read` / `finished` の2値）
- `src/types/index.ts` の `ReadingStatus` と `src/types/database.ts` の `reading_records` 型定義を更新
- DB: `reading_records_status_check` 制約を `to_read` / `reading` / `finished` に変更する migration を作成し、Supabase MCP 経由で本番プロジェクトに適用済み（既存データへの影響なし、`get_advisors` で新規指摘なしを確認）
- `recordService.create` に `startedAt` パラメータを追加。登録画面で「読書中」を選ぶと `started_at` に今日の日付を自動設定するようにした（`useBookRegistration`）。これによりカレンダー機能の `isReadingOnDate` 判定と整合する
- `src/utils/date.ts` に `todayString()` を切り出し（`app/(tabs)/index.tsx` のローカル関数と `useBookRegistration` の両方から共通利用）
- UI更新: 登録画面のステータス選択（`app/add/register.tsx`）、本棚のフィルターチップ・バッジ（`app/(tabs)/bookshelf.tsx`）、本の詳細画面のバッジ（`app/books/[id].tsx`）に「読書中」を追加。バッジ色は accent の coral（`Colors.coral100`/`coral400`）を使用
- `docs/requirements.md`（「読書中はステータスとして設けない」という旧方針を撤回・更新）、`docs/database.md`、`docs/ui.md`（フィルターチップ・ステータス表示・タブバー順序）を更新
- `npx tsc --noEmit` / `npx eslint .` / `npm test`（7件 green） すべて確認済み

### 変更ファイル
- `supabase/migrations/20260923010000_add_reading_status.sql`（新規）
- `src/types/index.ts`（変更）
- `src/types/database.ts`（変更）
- `src/services/recordService.ts`（変更）
- `src/hooks/useBookRegistration.ts`（変更）
- `src/utils/date.ts`（新規）
- `app/(tabs)/index.tsx`（変更、`todayString` を `src/utils/date.ts` に移動）
- `app/add/register.tsx`（変更）
- `app/(tabs)/bookshelf.tsx`（変更）
- `app/books/[id].tsx`（変更）
- `docs/requirements.md` / `docs/database.md` / `docs/ui.md`（変更）

---

## 2026-09-23 (diary_entries migration をSupabaseに適用)

### やったこと
- アプリ起動時のホーム画面変更後、実機で `diary_entries` テーブル未作成によるエラー（`PGRST205: Could not find the table 'public.diary_entries'`）を確認
- 今回のセッションでは Supabase MCP ツールが利用可能だったため、`supabase/migrations/20260923000000_diary_entries.sql` の内容をユーザー承認のうえ `apply_migration` で本番プロジェクトに適用
- `list_tables` で `public.diary_entries`（RLS有効）の作成を確認、`get_advisors`（security）で本件に起因する新規指摘がないことを確認（既存の Leaked Password Protection 警告のみ）

### 変更ファイル
- なし（Supabase 側のスキーマ変更のみ。`supabase/migrations/20260923000000_diary_entries.sql` は既存ファイルをそのまま適用）

---

## 2026-09-23 (アプリ起動時のホーム画面をカレンダーに変更)

### やったこと
- アプリ起動時（ログイン後・タブグループの初期表示）のホーム画面を本棚からカレンダー（日記）に変更
- `app/(tabs)/index.tsx`（本棚）を `app/(tabs)/bookshelf.tsx` にリネームし、`app/(tabs)/diary.tsx` を `app/(tabs)/index.tsx` にリネーム（Expo Router のファイルベースルーティングにより `/` がカレンダー画面になる）
- `app/(tabs)/_layout.tsx` のタブ定義を更新（`index` = カレンダー、`bookshelf` = 本棚。設定画面へのヘッダーボタンはホームになったカレンダー側に移植）
- `app/add/register.tsx` の「本棚を見る」ボタンの遷移先を `/` から `/bookshelf` に変更（ルート入れ替えにより `/` が本棚を指さなくなったため）
- `.expo/types/router.d.ts`（Expo CLI 自動生成、Git 管理対象外）を `npx expo start` の一時起動で再生成し、型チェックを通過することを確認
- `npx tsc --noEmit` / `npx eslint .` / `npm test`（Jest, 7件 green） すべて確認済み

### 変更ファイル
- `app/(tabs)/index.tsx`（旧 `diary.tsx`、リネーム）
- `app/(tabs)/bookshelf.tsx`（旧 `index.tsx`、リネーム）
- `app/(tabs)/_layout.tsx`（変更）
- `app/add/register.tsx`（変更）

---

## 2026-09-22 (日記機能の追加実装)

### やったこと
- 本棚とは別軸の新機能として「日記」を実装。カレンダー画面で日付を選択し、その日読書中の本にメモを記入・保存できる（1本×1日につき1件、上書き編集）
- 「読書中」の判定は新ステータス値を追加せず、`started_at` 設定済み かつ（`finished_at` 未設定 または その日以降）で判定する `isReadingOnDate` ユーティリティを実装（unit test 7件、全て green）
- DB: `diary_entries` テーブルの migration ファイルを作成（`user_id`/`book_id`/`entry_date` の UNIQUE 制約、RLS で本人の行のみ操作可能、インデックス3種）。Supabase MCP のツールがセッションに読み込まれていなかったため、Phase 3 と同じ「migration ファイル作成 → ユーザーが SQL Editor で手動実行」方式を採用
- 型定義: `Database['diary_entries']`、`DiaryEntry` ドメイン型を追加
- サービス層: `diaryService.ts`（`findByBookId` / `findByUserAndDate` / `upsert`）を既存の `bookService.ts`/`recordService.ts` と同じパターンで実装
- フック: `useDiary`（カレンダー画面用、既存の `useBookshelf` を内部で再利用）、`useBookDetail`（本の詳細画面用）を新規作成
- ナビゲーション: Expo Router の `(tabs)` グループを新設し、本棚 ⇄ カレンダーのタブバーを追加。`app/index.tsx` を `app/(tabs)/index.tsx` に移動し、ヘッダー設定を `app/(tabs)/_layout.tsx` に移植
- カレンダー画面 `app/(tabs)/diary.tsx` を新規実装（`react-native-calendars` の月表示 + 日本語ロケール設定、選択日の読書中リスト、メモ編集用モーダル）
- 本の詳細画面 `app/books/[id].tsx`（プレースホルダーだった）を更新し、書籍情報・読書ステータス・日記メモ一覧（日付降順）を表示するように実装（編集・削除は Phase 6 の残タスクとして対象外）
- 依存関係追加: `@expo/vector-icons`（タブアイコン用、react-dom peer 依存衝突のため一部 `--legacy-peer-deps`）、`expo-font`（`@expo/vector-icons` の必須 peer dependency、`expo-doctor` の指摘で追加）、`react-native-calendars`
- 初のテストファイル追加に伴い `tsconfig.json` に `"types": ["jest"]` を追加（`@types/jest` は既存の devDependency だったが未参照だったため `describe`/`it`/`expect` が型解決できずビルドエラーになっていた）
- `docs/requirements.md` / `docs/database.md` / `docs/architecture.md` / `docs/ui.md` を日記機能の内容で更新
- `npx tsc --noEmit` / `npx eslint .` / `npm test`（7件 green） すべて確認済み

### 注意点
- Supabase MCP サーバーは `claude mcp list` では接続確認できたが、本セッションのツール一覧には読み込まれていなかった。そのため `diary_entries` テーブルはまだ Supabase 上に作成されていない。ユーザーが Supabase SQL Editor で `supabase/migrations/20260923000000_diary_entries.sql` を実行する必要がある
- `expo-doctor` は本件と無関係な既存の指摘（`adaptive-icon.png` アセット不在、一部パッケージのパッチバージョンずれ）も出しているが、今回のスコープ外のため未対応

### 変更ファイル
- `supabase/migrations/20260923000000_diary_entries.sql`（新規）
- `src/types/database.ts`（変更: `diary_entries` テーブル型追加）
- `src/types/index.ts`（変更: `DiaryEntry` 型追加）
- `src/services/diaryService.ts`（新規）
- `src/utils/isReadingOnDate.ts` / `isReadingOnDate.test.ts`（新規）
- `src/hooks/useDiary.ts` / `useBookDetail.ts`（新規）
- `app/(tabs)/_layout.tsx`（新規）
- `app/(tabs)/index.tsx`（新規、`app/index.tsx` から移動）
- `app/(tabs)/diary.tsx`（新規）
- `app/index.tsx`（削除、`app/(tabs)/index.tsx` へ移動）
- `app/_layout.tsx`（変更: `(tabs)` グループを登録）
- `app/books/[id].tsx`（変更: プレースホルダーから書籍情報・日記表示に更新）
- `tsconfig.json`（変更: `types: ["jest"]` 追加）
- `package.json` / `package-lock.json`（変更: `@expo/vector-icons`, `expo-font`, `react-native-calendars` 追加）
- `docs/requirements.md` / `docs/database.md` / `docs/architecture.md` / `docs/ui.md`（変更）
- `tasks.md` / `progress.md`（変更）

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
<!-- session:end 2026-09-16 23:47 -->
<!-- session:end 2026-09-16 23:50 -->
<!-- session:end 2026-09-16 23:51 -->
<!-- session:end 2026-09-23 00:28 -->
<!-- session:end 2026-09-23 00:28 -->
<!-- session:end 2026-09-23 00:58 -->
<!-- session:end 2026-09-23 00:58 -->
<!-- session:end 2026-09-23 01:01 -->
<!-- session:end 2026-09-23 21:04 -->
<!-- session:end 2026-09-23 21:11 -->
<!-- session:end 2026-09-23 21:26 -->
<!-- session:end 2026-09-23 21:33 -->
<!-- session:end 2026-09-26 23:50 -->
<!-- session:end 2026-09-28 23:46 -->
<!-- session:end 2026-09-28 23:49 -->
<!-- session:end 2026-09-28 23:54 -->
<!-- session:end 2026-09-28 23:56 -->
<!-- session:end 2026-09-28 23:59 -->
<!-- session:end 2026-09-29 00:05 -->
<!-- session:end 2026-09-29 00:09 -->
<!-- session:end 2026-09-29 00:14 -->
<!-- session:end 2026-10-04 23:42 -->
<!-- session:end 2026-10-04 23:58 -->
<!-- session:end 2026-10-05 00:08 -->
<!-- session:end 2026-10-05 00:17 -->
<!-- session:end 2026-10-05 00:22 -->
<!-- session:end 2026-10-05 00:26 -->
