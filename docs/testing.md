# Testing

## テスト方針

品質を担保するための最小限のテストを実施する。

## テスト分類と対象

### Unit Test
- ビジネスロジック（ステータス変換・バリデーション）
- 型変換・マッピング（書籍 API レスポンス → Book モデル）
- ユーティリティ関数（日付フォーマット・ISBN 正規化）
- Zustand ストアのロジック

### Integration Test
- Supabase とのデータ操作（CRUD）
- 書籍 API とのやり取り

### E2E Test
- 主要ユースケース（MVP の主要フロー）

## テストツール

- Jest（Expo デフォルト）
- @testing-library/react-native（コンポーネントテスト）

## 実行コマンド

```bash
npm test               # テスト実行
npm test -- --coverage # カバレッジ付き
npx tsc --noEmit       # 型チェック
npx eslint .           # lint
```

## ファイル命名

```
src/utils/isbn.ts
src/utils/isbn.test.ts  ← 対応するテストファイル
```

## CI

将来的に GitHub Actions で自動化することを検討。
