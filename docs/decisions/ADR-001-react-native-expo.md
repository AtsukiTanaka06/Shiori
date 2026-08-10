# ADR-001: React Native + Expo の採用

## Context

読書記録 iPhone アプリ「Shiori」の開発フレームワークを選定する必要がある。

開発者の状況：
- 開発環境は Windows
- React / TypeScript の経験あり
- Swift / SwiftUI の経験なし
- 個人開発（保守コストを低く抑えたい）

アプリが必要とする機能：
- バーコード読み取り（カメラ）
- API 通信
- 一覧表示・フォーム
- 画像表示
- Supabase 連携

## Decision

**React Native + Expo** を採用する。

## Alternatives

| 選択肢 | メリット | デメリット |
|--------|---------|-----------|
| SwiftUI | iOS ネイティブ。パフォーマンス最良。Apple の最新機能を直接利用可 | macOS + Xcode が必要。Windows では開発できない。Swift 学習コストあり |
| React Native + Expo | Windows で開発可能。React / TypeScript の既存スキルを活用できる。EAS Build で Windows から iOS ビルド可能 | ネイティブより一部パフォーマンス劣る。Expo の制約あり |
| Flutter | クロスプラットフォーム対応。パフォーマンス良好 | Dart 学習コストあり。既存スキルを活かせない |

## Reason

1. **Windows で開発できる**：SwiftUI は macOS + Xcode が必須のため選択不可
2. **既存スキルを活用できる**：React / TypeScript の経験があるため学習コストが低い
3. **必要な機能が揃っている**：Expo Camera・EAS Build など、このアプリに必要な機能をカバーしている
4. **個人開発との相性が良い**：Expo による環境構築の簡略化、EAS による iOS ビルドの自動化

## Consequences

**ポジティブ:**
- Windows 環境で開発できる
- React / TypeScript の知識をそのまま活用できる
- EAS Build により、macOS なしで iOS アプリをビルド・配布できる
- Expo のエコシステム（Camera・Router 等）を利用できる

**ネガティブ:**
- SwiftUI と比較してネイティブ機能の一部に制限が生じる場合がある
- Expo SDK のバージョンアップ対応が必要になる
- Expo の制約（managed workflow の範囲）を把握しておく必要がある

## Status

Accepted
