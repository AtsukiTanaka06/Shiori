# Changelog

Claude が作業を完了した際に追記するログ。新しいエントリは上に追加する。

フォーマット:
```
## YYYY-MM-DD

### やったこと
- 項目

### 変更ファイル
- path/to/file
```

---

## 2026-08-10 (Phase 1)

### やったこと
- Phase 1 開始: Expo プロジェクトのセットアップを実施
- Expo 57 + Expo Router + TypeScript (strict) 構成でプロジェクトを作成
- ESLint / Prettier / Jest の設定を追加
- Expo Router に対応した画面スケルトン（9画面）を作成
- src/ ディレクトリ構成（components / hooks / store / services / lib / types / utils）を作成
- src/types/index.ts に Book / ReadingRecord 等の共通型定義を作成
- Node 20.10.0 と Expo 57 の互換性警告を確認（Node 20.19.4 以上を推奨）

### 注意
- Node.js を 20.19.4 以上にアップデートすることを強く推奨
- GitHub リポジトリ作成・プッシュは手動で実施が必要
- Supabase プロジェクト作成は手動で実施が必要（Phase 2 で詳細設定）

### 変更・作成ファイル
- `package.json`（新規）
- `app.json`（新規）
- `tsconfig.json`（新規）
- `babel.config.js`（新規）
- `eslint.config.js`（新規）
- `.prettierrc`（新規）
- `.prettierignore`（新規）
- `jest.config.js`（新規）
- `.gitignore`（新規）
- `README.md`（新規）
- `assets/`（新規）
- `app/_layout.tsx`（新規）
- `app/index.tsx`（新規）
- `app/login.tsx`（新規）
- `app/settings.tsx`（新規）
- `app/add/_layout.tsx`（新規）
- `app/add/index.tsx`（新規）
- `app/add/scan.tsx`（新規）
- `app/add/search.tsx`（新規）
- `app/add/register.tsx`（新規）
- `app/books/[id].tsx`（新規）
- `app/books/[id]/edit.tsx`（新規）
- `src/types/index.ts`（新規）
- `src/lib/`, `src/components/`, `src/hooks/`, `src/store/`, `src/services/`, `src/utils/`（新規）
- `docs/architecture.md`（更新: ディレクトリ構成修正）
- `tasks.md`（更新）
- `progress.md`（更新）

---

## 2026-08-10

### やったこと

- Claude Code 開発基盤を構築した
- 要件定義書・技術選定書をもとに CLAUDE.md / Rules / Skills / Agents を作成
- docs/ にアーキテクチャ・DB・API・UI・テスト設計のテンプレートを作成
- ADR（Architecture Decision Records）の仕組みを導入
- 進捗管理ファイル（tasks.md / progress.md / CHANGELOG.md）を整備
- Claude Code の Stop フックでセッション終了を自動記録するよう設定

### 作成ファイル

- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/rules/general.md`
- `.claude/rules/typescript.md`
- `.claude/rules/react.md`
- `.claude/rules/database.md`
- `.claude/rules/testing.md`
- `.claude/rules/security.md`
- `.claude/skills/feature/SKILL.md`
- `.claude/skills/ui-review/SKILL.md`
- `.claude/skills/code-review/SKILL.md`
- `.claude/skills/test/SKILL.md`
- `.claude/skills/db-migration/SKILL.md`
- `.claude/skills/release/SKILL.md`
- `.claude/agents/reviewer.md`
- `.claude/agents/tester.md`
- `.claude/agents/security-reviewer.md`
- `docs/requirements.md`
- `docs/architecture.md`
- `docs/database.md`
- `docs/api.md`
- `docs/ui.md`
- `docs/testing.md`
- `docs/decisions/README.md`
- `docs/decisions/template.md`
- `docs/decisions/ADR-001-react-native-expo.md`
- `plan.md`
- `progress.md`
- `tasks.md`
- `CHANGELOG.md`
- `.env.example`

---
