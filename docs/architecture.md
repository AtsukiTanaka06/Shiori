# Architecture

## 概要

Shiori は React Native + Expo + Supabase で構築する iOS アプリ。

## レイヤー構成

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│   app/ (Expo Router)                    │
│   components/ (UIコンポーネント)          │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│           Application Layer             │
│   hooks/ (カスタムフック)                 │
│   store/ (Zustand)                      │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│           Domain Layer                  │
│   types/ (型定義)                        │
│   utils/ (ユーティリティ)                 │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│        Infrastructure Layer             │
│   services/ (Supabase・書籍API)          │
│   lib/ (Supabaseクライアント等)           │
└─────────────────────────────────────────┘
```

## ディレクトリ構成

```
app/                   # Expo Router（画面）— プロジェクトルートに配置
├── _layout.tsx        # ルートレイアウト
├── index.tsx          # 本棚
├── login.tsx
├── settings.tsx
├── add/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── scan.tsx
│   ├── search.tsx
│   └── register.tsx
└── books/
    └── [id].tsx
    └── [id]/
        └── edit.tsx
src/                   # アプリロジック（非ルーター）
├── components/        # 再利用可能なUIコンポーネント
├── hooks/             # カスタムフック（ビジネスロジック）
├── store/             # Zustand ストア
├── services/          # 外部サービス連携（Supabase、書籍API）
├── lib/               # クライアント初期化（supabase.ts等）
├── types/             # 型定義（index.ts）
└── utils/             # ユーティリティ関数
```

## 状態管理

Zustand を使用。以下のストアを想定：

- `authStore`：ログイン状態・ユーザー情報
- `bookshelfStore`：本棚の表示モード・フィルター
- `bookRegistrationStore`：本登録フロー中の一時状態

## データフロー

### 書籍登録（バーコード）

```
Expo Camera → ISBN → 書籍API (OpenBD) → Mapperで変換 → 登録画面 → Supabase
```

### 本棚表示

```
Supabase → reading_records（JOIN books） → Zustand → FlatList
```

## Open Questions

- 書籍APIの最終選定（OpenBD vs Google Books API 等）
- 書籍APIのフォールバック戦略
- books テーブルの重複管理（同じ ISBN の書籍）
- 表紙画像の保存方法（Supabase Storage vs API の URL 直接参照）
- オフライン時の挙動
