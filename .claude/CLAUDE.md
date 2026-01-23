# OUTPUT QUEST - プロジェクト指示

Zenn記事執筆をゲーム化したRPG風学習支援Webアプリ。記事投稿でレベルアップし、称号・アイテム・仲間を獲得する。

## 必須ルール

- **pnpm のみ使用** - npm/yarn は禁止
- **破壊的変更は確認必須** - 大規模リファクタリングは事前承認を得る
- **技術スタックのバージョン変更禁止** - 変更には承認が必要
- **既存パターンに従う** - 新機能実装前に類似機能を調査
- **雑な対応は絶対禁止** - 一時ファイルは作業完了後に必ず削除、問題を gitignore 等で隠さない、根本解決を常に優先

## 技術スタック

| カテゴリ  | 技術                                       |
| --------- | ------------------------------------------ |
| Framework | Next.js 16.0.0 (App Router) + React 19.2.0 |
| Language  | TypeScript 5.9.3 (strict mode)             |
| Styling   | Tailwind CSS v4.1.16 + CSS Modules         |
| UI        | shadcn/ui + Radix UI                       |
| Animation | Motion (Framer Motion) v12.23.24           |
| Auth      | Clerk v6.34.1                              |
| DB        | Supabase (PostgreSQL) + Prisma ORM v6.18.0 |
| AI        | Vercel AI SDK v5.0.78 + Gemini 2.5 Pro     |

## 開発コマンド

```bash
pnpm dev              # 開発サーバー起動
pnpm build            # プロダクションビルド
pnpm lint:fix         # ESLint + Prettier 自動修正
pnpm prisma generate  # Prisma Client 生成
pnpm prisma studio    # DB GUI
```

## コーディング規約

### ファイル命名

- コンポーネント: `PascalCase.tsx`
- モジュール/ユーティリティ: `camelCase.ts`
- CSS Modules: `ComponentName.module.css`
- API Routes: `kebab-case/route.ts`

### コンポーネント構成

- **ページ固有**: `src/app/**/<page>/`
- **共有**: `src/components/` (auth/, common/, elements/, layout/, ui/)
- **機能別**: `src/features/<domain>/components/`
  ```ts
  import * as Party from "@/features/party/components";
  <Party.MemberCard />
  ```

### Next.js 16 機能

- React Compiler 有効 (`reactCompiler: true`)
- Cache Components 有効 (`cacheComponents: true`)
- Server Components がデフォルト
- `use server` で Server Actions
- ISR: `export const revalidate = <seconds>`

### Image コンポーネント

- `width`/`height` を明示的に指定
- デフォルトは `loading="lazy"`
- ファーストビューのみ `priority={true}`
- `{isLoading ? ... : <Image />}` パターンは避ける（priority が効かなくなる）

### データフェッチ

- Server Components: `fetch` + `cache`/`revalidate`
- 変更処理: Server Actions (`use server`)
- クライアント: useEffect + fetch（必要時のみ）

### エラーハンドリング

- API: 4xx/5xx + 明確なエラーメッセージ
- UI: Sonner toast
- 機密情報のログ出力禁止

## Git コミット形式

```
<type>(<scope>): <subject>
```

| type     | 用途             |
| -------- | ---------------- |
| feat     | 新機能           |
| fix      | バグ修正         |
| refactor | リファクタリング |
| docs     | ドキュメント     |
| chore    | メンテナンス     |

## 詳細ルール

言語固有のガイドライン、テスト規約などは `.claude/rules/` を参照。
