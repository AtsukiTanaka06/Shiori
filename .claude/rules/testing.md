# Testing Rules

## テスト追加の基本方針

- 新機能には必ずテストを追加する
- バグ修正には再発防止テストを追加する

## テスト分類と対象

### Unit Test
- ビジネスロジック（ステータス判定・バリデーション）
- ユーティリティ関数（日付フォーマット・ISBN正規化）
- 型変換・マッピング（APIレスポンス → Book モデル）
- Zustand ストアのロジック

### Integration Test
- Supabase とのデータ操作（CRUD）
- 書籍 API とのやり取り
- 認証フロー

### E2E Test
- 主要ユースケース（バーコード登録・検索登録・本棚表示）

## テストフレームワーク

Jest（Expo デフォルト）

## ファイル命名

```
src/utils/isbn.ts
src/utils/isbn.test.ts
```

`*.test.ts` または `*.spec.ts`

## テストファイルの配置

対象ファイルと同ディレクトリ、または `tests/`

## 実行コマンド

```bash
npm test               # テスト実行
npm test -- --coverage # カバレッジ付き
npx tsc --noEmit       # 型チェック
npx eslint .           # lint
```
