# TypeScript Rules

## 基本設定

- `strict: true` を必須とする（緩めない）

## any の禁止

- `any` を原則禁止とする
- やむを得ない場合は以下の形式で記載する：

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 理由：〇〇のため any を使用
```

## unknown の扱い

- `unknown` を適切に扱う（型ガードを使ってから操作する）

```typescript
function process(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
}
```

## 型アサーション

- 型アサーション（`as`）は乱用しない
- 型ガードや型推論で解決できる場合は使わない

## interface vs type

- オブジェクト型は `interface` を使う
- ユニオン型・交差型・プリミティブの別名は `type` を使う

```typescript
// オブジェクト型 → interface
interface Book {
  id: string;
  title: string;
}

// ユニオン型 → type
type ReadingStatus = 'to_read' | 'finished';
```

## その他の記法

- optional chaining（`?.`）と nullish coalescing（`??`）を積極的に使う
- 複雑な関数の戻り値の型は明示する
- `Enum` は使わず union type を使う

## 型定義ファイルの配置

`src/types/` に配置する。

## 共通型の例

```typescript
// ステータス
type ReadingStatus = 'to_read' | 'finished';

// 書籍
interface Book {
  id: string;
  isbn: string;
  title: string;
  authors: string[];
  coverImage?: string;
  publisher?: string;
  publishedAt?: string;
  pageCount?: number;
  genre?: string;
  createdAt: string;
}

// 読書記録
interface ReadingRecord {
  id: string;
  userId: string;
  bookId: string;
  status: ReadingStatus;
  startedAt?: string;
  finishedAt?: string;
  rating?: number;
  impression?: string;
  memo?: string;
  createdAt: string;
}
```
