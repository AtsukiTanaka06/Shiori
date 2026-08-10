# Claude Code 初期プロジェクト構築指示

あなたは、このプロジェクトの「開発環境・AI開発基盤」を設計するシニアソフトウェアアーキテクトです。

今回はまだアプリ本体の実装を開始しません。

目的は、今後Claude Codeを使って高品質なスマホアプリを継続的に開発できるように、

- プロジェクト構成
- ドキュメント構成
- CLAUDE.md
- Claude Code Rules
- Skills
- Subagents
- Hooks
- 開発ルール
- Git運用
- テスト方針

などの「AI開発基盤」を構築することです。

---

# 1. 最初に必ず確認すること

まず、現在のプロジェクトディレクトリを調査してください。

以下を確認してください。

- 現在存在するファイル
- 現在存在するディレクトリ
- package.json
- README
- docs
- plan.md
- 既存のCLAUDE.md
- .claude
- Git状態
- 既存コード
- 既存設定ファイル

特に以下のドキュメントが存在する場合は必ず読み込んでください。

- 要件定義書
- 技術選定書
- plan.md

既存のドキュメントが存在する場合、それを勝手に削除・上書きしないでください。

まず現在の状態を分析してください。

---

# 2. 今回やってはいけないこと

今回のタスクでは、アプリ本体の機能実装を開始しないでください。

以下は禁止です。

- 画面の実装
- DBテーブルの実装
- API実装
- 認証実装
- バーコード機能実装
- UIコンポーネント実装
- 本登録機能実装
- 本棚機能実装

今回は「開発基盤の構築」のみ行います。

---

# 3. 目標ディレクトリ構成

以下を基本構成としてください。

```text
project/
│
├── CLAUDE.md
│
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   ├── ui.md
│   ├── testing.md
│   └── decisions/
│
├── plan.md
├── progress.md
│
├── .claude/
│   ├── settings.json
│   │
│   ├── rules/
│   │   ├── general.md
│   │   ├── typescript.md
│   │   ├── react.md
│   │   ├── database.md
│   │   ├── testing.md
│   │   └── security.md
│   │
│   ├── skills/
│   │   ├── feature/
│   │   │   └── SKILL.md
│   │   ├── ui-review/
│   │   │   └── SKILL.md
│   │   ├── code-review/
│   │   │   └── SKILL.md
│   │   ├── test/
│   │   │   └── SKILL.md
│   │   ├── db-migration/
│   │   │   └── SKILL.md
│   │   └── release/
│   │       └── SKILL.md
│   │
│   └── agents/
│       ├── reviewer.md
│       ├── tester.md
│       └── security-reviewer.md
│
├── src/
├── tests/
├── supabase/
└── ...
```

ただし、実際の技術選定書と現在のプロジェクト構成を確認し、不要なディレクトリや技術的に不適切な構成があれば修正してください。

「上記を盲目的にコピーする」のではなく、プロジェクトに最適化してください。

---

# 4. CLAUDE.mdを作成する

プロジェクトルートにCLAUDE.mdを作成してください。

CLAUDE.mdは、このプロジェクトにおけるClaude Codeの基本ルールです。

以下を含めてください。

## Project Overview

- アプリの概要
- プロジェクトの目的

## Tech Stack

要件定義書・技術選定書に基づいて記載してください。

## Architecture

採用するアーキテクチャの概要を記載してください。

## Development Principles

例えば、

- TypeScript strict
- anyを原則禁止
- UIとビジネスロジックを分離
- DBアクセスを適切なデータ層に集約
- コンポーネントから直接DBアクセスしない
- 既存コードを理解してから変更する
- 不要な依存関係を追加しない
- 小さく変更する
- テスト可能なコードを書く

など。

## Development Workflow

Claude Codeが機能開発するときの標準手順を定義してください。

基本的には、

1. 要件確認
2. 関連ドキュメント確認
3. 関連コード調査
4. 影響範囲確認
5. 実装計画作成
6. ユーザー確認
7. 実装
8. テスト
9. 型チェック
10. lint
11. code review
12. ドキュメント更新
13. progress.md更新

という流れを基本としてください。

## Architecture Change Policy

以下をClaudeが勝手に変更しないようにしてください。

- フレームワーク
- DB
- 認証方式
- 状態管理
- ナビゲーション
- アーキテクチャ
- 外部API
- 主要ライブラリ

変更が必要な場合は、

1. なぜ必要なのか
2. 現在の方式の問題
3. 代替案
4. 推奨案
5. 影響範囲

を説明し、ユーザーの承認を得てから変更するようにしてください。

---

# 5. Rulesを作成する

.claude/rules/ にプロジェクトルールを分離してください。

## general.md

プロジェクト全体の一般ルール。

## typescript.md

TypeScriptのルール。

例：

- strict mode
- any禁止
- 型定義を適切に行う
- 型アサーションを乱用しない
- unknownを適切に扱う

## react.md

React / React Nativeに関するルール。

例：

- Functional Component
- Hooksの適切な利用
- 不要なuseEffectを避ける
- UIとロジックを分離
- 再利用可能なコンポーネントを設計

## database.md

Supabase / PostgreSQLに関するルール。

例：

- DBアクセスの責務を分離
- migrationを使用
- 本番DBを直接変更しない
- RLSを適切に設計
- service_role keyをクライアントに露出させない

## testing.md

テストルール。

例：

- 新機能にはテストを追加
- バグ修正には再発防止テストを追加
- unit / integration / E2Eを適切に使い分ける
- typecheckとlintを実施

## security.md

セキュリティルール。

例：

- APIキーをソースコードにハードコードしない
- 秘密情報をGitにコミットしない
- Supabase RLSを適切に使用
- ユーザー入力を信用しない
- 認証・認可を明確に分離

---

# 6. Skillsを作成する

.claude/skills/ に以下のSkillsを作成してください。

## feature

新機能を開発するときに使用します。

標準手順：

1. requirements確認
2. architecture確認
3. database確認
4. 関連コード調査
5. 影響範囲分析
6. 実装計画
7. 実装
8. テスト
9. lint
10. typecheck
11. review
12. ドキュメント更新
13. progress更新

---

## ui-review

UIをレビューするSkill。

以下を確認してください。

- レイアウト
- UX
- アクセシビリティ
- 一貫性
- エラー状態
- ローディング状態
- 空状態
- 操作性
- レスポンシブ対応
- デザインシステムとの整合性

---

## code-review

コードレビュー用Skill。

以下を厳しく確認してください。

- バグ
- セキュリティ
- 型安全性
- パフォーマンス
- 可読性
- 保守性
- 重複
- 過剰設計
- アーキテクチャ違反
- エラーハンドリング
- テスト不足

問題がなければ無理に問題を作らないでください。

---

## test

テスト作成・実行用Skill。

以下を判断してください。

- unit testが必要か
- integration testが必要か
- E2E testが必要か

テストを実行し、失敗した場合は原因を分析してください。

---

## db-migration

Supabase / PostgreSQLのmigration用Skill。

以下を必ず確認してください。

- schema変更
- migration
- RLS
- index
- foreign key
- constraint
- rollback可能性
- データ破壊リスク

危険なDB変更はユーザー確認なしで実行しないでください。

---

## release

リリース前チェック用Skill。

以下を確認してください。

- test
- typecheck
- lint
- build
- environment variables
- secrets
- database migration
- error handling
- logging
- version
- Git status

---

# 7. Subagentsを作成する

.claude/agents/ に以下を作成してください。

## reviewer.md

「厳格なSenior Engineer」としてコードレビューするエージェント。

重要：

- 原則としてコードを変更しない
- 問題を具体的に指摘
- 重要度を分類
- 改善案を提示
- 問題がなければ問題なしと判断

## tester.md

テスト専門エージェント。

- テスト不足を探す
- テストケースを提案
- テストを実行
- 失敗原因を分析

## security-reviewer.md

セキュリティ専門エージェント。

特に、

- authentication
- authorization
- Supabase RLS
- secrets
- API
- user input
- storage
- data exposure

を確認してください。

---

# 8. progress.mdを作成

現在のプロジェクト状況を記録するファイルです。

以下の形式を基本としてください。

```markdown
# Current Progress

## Current Phase

開発基盤構築

## Completed

- 要件定義
- 技術選定

## In Progress

- Claude Code開発環境構築

## Next

- アーキテクチャ設計
- DB設計
- API設計
- UI設計

## Blockers

None

## Last Updated

YYYY-MM-DD
```

実際のプロジェクト状況に合わせてください。

---

# 9. docsを確認・整理する

既存の要件定義書・技術選定書がある場合は、それを尊重してください。

不足している場合は、

- architecture.md
- database.md
- api.md
- ui.md
- testing.md

のテンプレートを作成してください。

ただし、まだ詳細設計が決まっていない部分について、勝手に仕様を確定しないでください。

未決定事項は、

```markdown
## Open Questions

- TBD
```

などとして明示してください。

---

# 10. ADRを用意する

docs/decisions/ にADR用のREADMEまたはテンプレートを作成してください。

テンプレート：

```markdown
# ADR-XXX

## Context

## Decision

## Alternatives

## Reason

## Consequences

## Status
```

今後、重要な技術判断をした場合にADRとして記録できるようにしてください。

---

# 11. Git状態を確認

構築開始前と構築終了後に、

```bash
git status
```

を確認してください。

既存ユーザー変更を勝手に削除・上書きしないでください。

既存ファイルを変更する場合は、変更理由を明確にしてください。

---

# 12. セキュリティ

以下を絶対に行わないでください。

- APIキーのハードコード
- Supabase service_role keyのクライアント利用
- .envのGitコミット
- credentialsの保存
- 秘密情報のドキュメントへの記載

必要な環境変数は `.env.example` に整理してください。

---

# 13. 最終チェック

構築が完了したら、

1. ディレクトリ構成
2. CLAUDE.md
3. Rules
4. Skills
5. Agents
6. docs
7. plan.md
8. progress.md
9. Git状態

を確認してください。

また、Claude Codeから見て、

「次回セッションでこのプロジェクトの開発を開始できる状態」

になっているか確認してください。

---

# 14. 完了時の報告

最後に以下の形式で報告してください。

## Created

作成したファイル一覧。

## Modified

変更した既存ファイル一覧。

## Architecture

今回採用したAI開発基盤の概要。

## Claude Code Workflow

今後、Claude Codeをどのように使えばよいか。

## Remaining

まだ決まっていない事項。

## Recommended Next Step

次にClaude Codeへ何を指示すべきか。

重要：

今回はアプリ本体の実装を開始しないでください。
「開発基盤の構築」が完了したところで停止してください。