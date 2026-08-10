# Shiori

バーコードスキャンや書籍検索で本を登録し、読書記録を管理するiPhoneアプリ。

## Tech Stack

- React Native + Expo (SDK 57)
- Expo Router
- TypeScript (strict)
- Zustand
- Supabase (PostgreSQL + Auth + RLS)

## 開発環境

- Node.js 20.19.4 以上推奨（20.10.0 では EBADENGINE 警告が出る）
- npm
- VS Code

## セットアップ

```bash
npm install
npm start
```

## コマンド

```bash
npm start          # Expo Dev Server 起動
npm run ios        # iOS シミュレーター起動
npm run test       # テスト実行
npm run typecheck  # 型チェック
npm run lint       # ESLint
```

## ドキュメント

- [要件定義](./docs/requirements.md)
- [アーキテクチャ](./docs/architecture.md)
- [DB設計](./docs/database.md)
- [開発計画](./plan.md)
- [進捗](./progress.md)
