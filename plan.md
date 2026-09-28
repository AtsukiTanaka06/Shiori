# Development Plan

## 目標

iOS アプリ「Shiori」を App Store に公開する。

## フェーズ

### Phase 0: 開発基盤構築
- Claude Code 開発環境
- CLAUDE.md / Rules / Skills / Agents
- ドキュメント整備
- **Status: 完了**（2026-08-10）

### Phase 1: Expo プロジェクトセットアップ
- Expo プロジェクト作成
- TypeScript 設定
- ESLint / Prettier 設定
- Expo Router 設定
- 基本ディレクトリ構成
- GitHub リポジトリ設定
- **Status: 完了**（2026-08-10）

### Phase 2: 認証
- Supabase プロジェクト作成
- Supabase Auth 設定（メール + パスワード）
- ログイン画面
- セッション管理
- ログアウト
- **Status: 完了**（2026-08-12）
- Sign in with Apple は Phase 2.5 として後回しにした（`tasks.md` バックログ参照）

### Phase 2.5: Sign in with Apple（後回し）
- Apple Developer Program 登録
- App ID / Service ID / Key 設定
- Sign in with Apple 実装
- Supabase Auth に Apple プロバイダー追加
- **Status: 未着手**（Apple Developer Program 登録がブロッカー）

### Phase 3: DB 構築
- books テーブル作成（migration）
- reading_records テーブル作成（migration）
- RLS 設定
- CRUD 処理実装
- **Status: 完了**（2026-08-14）

### Phase 4: 書籍登録
- 書籍 API クライアント実装（OpenBD 第一候補 + Google Books フォールバック）
- バーコードスキャン画面
- 書籍検索画面
- 書籍情報・登録画面
- **Status: 完了**（2026-08-15）

### Phase 5: 本棚
- 本棚画面（リスト表示）
- カバー表示（グリッド）
- 表示切り替え
- ステータスフィルター
- **Status: 完了**

### Phase 6: 本の詳細・編集・削除
- 詳細画面
- 編集画面
- 削除（確認ダイアログ付き）
- **Status: 実装完了・実機確認待ち**（2026-09-28）

### 追加機能: 日記（カレンダー）
当初の計画にはなかったが、Phase 5〜6 と並行して追加した機能。現在はアプリ起動時のホーム画面になっている。
- diary_entries テーブル・RLS・migration 適用済み
- カレンダー画面（日別の読書中リスト・メモ入力）
- 読書ステータスに「読書中」を追加（カレンダー機能との連動のため）
- タブナビゲーション新設（本棚 ⇄ カレンダー）
- **Status: 実装完了・実機確認待ち**（2026-09-23）

### Phase 7: 設定・アカウント
- 設定画面（ログアウトのみ実装済み）
- アカウント削除（ユーザーデータの完全削除）
- **Status: 未着手**

### Phase 8: リリース
- EAS Build 設定（eas.json）
- 環境変数設定（EAS Secrets）
- Supabase の「Confirm email」を本番前に有効化
- TestFlight 配布・動作確認
- App Store 申請
- **Status: 未着手**（Apple Developer Program 登録が前提）

## 決定済み事項（旧: 未決定事項）

- **書籍 API**: OpenBD を第一候補、Google Books API をフォールバックとして採用・実装済み（`src/services/bookApiService.ts`）
- **表紙画像の保存方法**: Supabase Storage には保存せず、書籍 API から取得した URL を `books.cover_image` にそのまま保存する方式を採用
- **books テーブルの重複 ISBN 戦略**: `books` は全ユーザー共有リソースとし、同一 ISBN は1行のみ（`bookService.findOrCreate`）。ユーザーごとの読書記録は `reading_records` で管理
- **UI デザイン**: `src/constants/design.ts`（カラー・スペーシング・角丸トークン）と `docs/ui.md` に集約

## 未決定事項・ブロッカー（残）

- **Apple Developer Program 登録**（唯一の外部要因ブロッカー）— Phase 2.5（Sign in with Apple）と Phase 8（EAS Build / TestFlight / App Store 申請）の両方をブロックしている。登録を進めない限りこの2フェーズは着手できない

## リスク・今後の注意点（2026-09-29 振り返り）

- **実機/シミュレータ動作確認が2件未消化のまま積み上がっている**（日記機能: 2026-09-23〜／Phase 6 編集・削除: 2026-09-28〜）。確認せずに次の機能開発を進めると、不具合の発見・切り分けが遅れるリスクがある。次のセッションでは新機能着手より先にこの2件の実機確認を優先することを推奨
- **テストカバレッジの偏り**: `.claude/rules/testing.md` は Unit / Integration / E2E の3種を求めているが、現状は Unit Test（純粋関数2ファイル、計12ケース）のみ。Supabase CRUD・書籍 API・認証フローの Integration Test、主要ユースケースの E2E Test が未着手。Phase 8（リリース）前にこのギャップを埋めないと、リグレッションの検知手段がないままストア申請することになる
- **Expo SDK のバージョン往復**（57→54→57）が一度発生している。開発環境（Expo Go）とプロジェクトの SDK バージョンは事前にすり合わせ、リリースが近づくタイミングでの不要な再アップグレードは避ける
- Phase 7（アカウント削除）は個人情報保護の観点で重要度が高い一方、着手時期の目安が計画上明確でない。App Store 審査ではアカウント削除機能が要求されるため、**Phase 8着手前に必ず完了させる**ことを明記しておく
