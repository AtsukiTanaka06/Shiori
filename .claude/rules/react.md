# React Native Rules

## コンポーネント

- Functional Component のみ使用する（クラスコンポーネント禁止）
- コンポーネントの責務を明確にする（表示担当 vs ロジック担当）

## Hooks

- `useCallback`・`useMemo` は必要な場合のみ使う（不要なメモ化はしない）
- 不要な `useEffect` を避ける（データ変換や派生状態は `useMemo` や通常の変数で処理する）
- UIとロジックを分離する（ロジックはカスタムフックに切り出す）

## データアクセス

- コンポーネントから直接 Supabase を呼ばない
- `hooks/` または `services/` を経由する

## Expo Router

- `app/` ディレクトリの規約に従う
- ファイルベースルーティングを維持する

## Zustand

- store は `store/` ディレクトリに配置する
- ストアを細かく分割しすぎない

## レイアウト

- `SafeAreaView` を適切に使う（ノッチ・ホームインジケーターの考慮）
- `KeyboardAvoidingView` を適切に使う（フォーム画面）
- 長いリストには `FlatList` を使う（`ScrollView` 内のリストは避ける）

## スタイル

- `StyleSheet.create` を基本とする
- インラインスタイルを多用しない
