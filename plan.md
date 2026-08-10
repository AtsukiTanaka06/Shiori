# Development Plan

## 目標

iOS アプリ「Shiori」を App Store に公開する。

## フェーズ

### Phase 0: 開発基盤構築（現在）
- Claude Code 開発環境
- CLAUDE.md / Rules / Skills / Agents
- ドキュメント整備
- **Status: In Progress**

### Phase 1: Expo プロジェクトセットアップ
- Expo プロジェクト作成
- TypeScript 設定
- ESLint / Prettier 設定
- Expo Router 設定
- 基本ディレクトリ構成
- GitHub リポジトリ設定
- **Status: Not Started**

### Phase 2: 認証
- Supabase プロジェクト作成
- Supabase Auth 設定
- Sign in with Apple
- ログイン画面
- セッション管理
- ログアウト
- **Status: Not Started**

### Phase 3: DB 構築
- books テーブル作成（migration）
- reading_records テーブル作成（migration）
- RLS 設定
- CRUD 処理実装
- **Status: Not Started**

### Phase 4: 書籍登録
- 書籍 API クライアント実装（OpenBD 評価）
- バーコードスキャン画面
- 書籍検索画面
- 書籍情報・登録画面
- **Status: Not Started**

### Phase 5: 本棚
- 本棚画面（リスト表示）
- カバー表示（グリッド）
- 表示切り替え
- ステータスフィルター
- **Status: Not Started**

### Phase 6: 本の詳細・編集
- 詳細画面
- 編集画面
- 削除
- **Status: Not Started**

### Phase 7: 設定・アカウント
- 設定画面
- アカウント削除
- データ削除
- **Status: Not Started**

### Phase 8: リリース
- EAS Build 設定
- TestFlight
- App Store 申請
- **Status: Not Started**

## 未決定事項

- 書籍 API の最終選定（OpenBD vs Google Books API 等）
- UI デザインの詳細
- 表紙画像の保存方法
- books テーブルの重複 ISBN 戦略
