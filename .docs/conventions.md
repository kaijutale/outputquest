# コーディング規約

> TL;DR: RSCデフォルト、features/でドメイン分割、既存パターンに従う。

## ファイル命名

- コンポーネント: `PascalCase.tsx`
- モジュール/ユーティリティ: `camelCase.ts`
- CSS Modules: `ComponentName.module.css`
- API Routes: `kebab-case/route.ts`

## コンポーネント構成

- **ページ固有**: `src/app/**/<page>/`
- **共有**: `src/components/` (auth/, common/, elements/, layout/, ui/)
- **機能別**: `src/features/<domain>/components/`

```ts
// 機能別コンポーネントのインポート例
import * as Party from "@/features/party/components";
<Party.MemberCard />
```

## Next.js 16 機能

- React Compiler 有効 (`reactCompiler: true`)
- Cache Components 有効 (`cacheComponents: true`)
- Server Components デフォルト -- `'use client'`は必要時のみ
- `use server` で Server Actions
- ISR: `export const revalidate = <seconds>`

## Image コンポーネント

- `width`/`height` を明示的に指定
- デフォルトは `loading="lazy"`
- ファーストビューのみ `preload={true}`
- `{isLoading ? ... : <Image />}` パターン禁止（priorityが効かなくなる）
  - Skeletonオーバーレイパターンを使用

## データフェッチ

| パターン | 手段 |
|---|---|
| 読み取り（RSC） | `fetch` + `cache`/`revalidate` |
| 変更処理 | Server Actions (`use server`) |
| クライアント | useEffect + fetch（必要時のみ） |

## エラーハンドリング

- API: 4xx/5xx + 明確なエラーメッセージ
- UI: Sonner toast
- 機密情報のログ出力禁止
