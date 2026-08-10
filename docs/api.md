# API

## 書籍情報API

### 第一候補：OpenBD

日本の書籍情報を提供する API サービス。

エンドポイント例：

```
GET https://api.openbd.jp/v1/get?isbn={isbn}
```

### フォールバック候補

- Google Books API
- 国立国会図書館サーチ API
- 楽天ブックス API

### APIレスポンス → Bookモデル変換

書籍 API のレスポンスをそのまま利用せず、Mapper で変換する。

```typescript
// 変換パターン
APIResponse → mapper関数 → Book型
```

### 評価項目

| 項目 | 内容 |
|------|------|
| ISBN-13 対応 | 日本の書籍は ISBN-13 が主流 |
| 日本語書籍カバー率 | 日本語書籍への対応率 |
| 表紙画像取得可否 | 表紙画像の URL が含まれるか |
| 料金・制限 | 無料 / 有料・リクエスト制限 |
| 利用規約 | 商用利用可否・著作権 |

## Supabase API

Supabase クライアント SDK を通じて DB にアクセスする。

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
)
```

## 環境変数

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

## Open Questions

- 書籍 API の最終選定
- OpenBD の表紙画像取得可否の確認
- 書籍 API のレート制限対応
- フォールバック戦略の詳細
