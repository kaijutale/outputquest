# テスト

OUTPUT QUEST のテスト方針と運用。現状は **Tier 1（純粋関数のユニットテスト）** のみ導入済み。

> この文書は「実在するテストの規約」だけを書く。未実装の理想構成（過去に testing.md を削除した原因）は書かない。Tier 2 以降は実装時に追記する。

## フレームワーク

- **Vitest**（`vitest.config.ts`）。ESM ネイティブで Next.js 16 / React 19 / TS と相性が良い
- 環境はデフォルト `node`。DOM が要るテストのみ per-file で happy-dom を使う

## 実行コマンド

```bash
pnpm test       # watch モード
pnpm test:run   # 1回実行（CI と同じ）
```

## テストの置き場所・命名

- 実装ファイルと **co-locate** し、`*.test.ts` で命名（例: `src/utils/formatDate.ts` → `src/utils/formatDate.test.ts`）
- `vitest.config.ts` の `include: ["src/**/*.test.ts"]` で収集
- 各テストは `import { describe, it, expect } from "vitest"` を明示 import（globals は使わない）

## 現在の対象（Tier 1 = 純粋関数のみ）

| 対象 | テスト |
|---|---|
| `src/utils/formatDate.ts` | `formatDate.test.ts` |
| `src/features/connection/utils/index.ts`（ユーザー名検証） | `index.test.ts` |
| `src/lib/cache-tags.ts` | `cache-tags.test.ts` |
| `src/lib/utils.ts`（`cn`） | `utils.test.ts` |
| `src/utils/storage.ts`（localStorage ラッパー） | `storage.test.ts` |
| `src/features/party-member/utils/generatePartyMemberData.ts` | `generatePartyMemberData.test.ts` |
| `src/features/item-detail/utils/generateItemData.ts` | `generateItemData.test.ts` |

## 設定上の注意（gotcha）

- **`server-only` のスタブ**: `src/lib/cache-tags.ts` は `import "server-only"` を含む。これは RSC グラフ外で import すると例外を投げるため、`vitest.config.ts` の alias で `test/stubs/server-only.ts`（空モジュール）に差し替えている
- **happy-dom（per-file）**: `window.localStorage` 依存の `storage.test.ts` のみ、ファイル先頭に `// @vitest-environment happy-dom` を付ける
- **`@/*` alias**: `vitest.config.ts` の `resolve.alias` で `tsconfig` の `@/* → src/*` を正規表現で再現（スコープ付きパッケージ `@clerk/*` 等に誤マッチしないよう `/^@\/(.*)$/`）
- **データ依存の分離**: `generate*` 系は `vi.mock` で静的データを差し替え、rarity 判定ロジックのみを検証

## CI

- `.github/workflows/ci.yml` の `Test` ジョブで `pnpm test:run` を実行（**blocking** = 失敗で PR を止める。lint の advisory とは異なる）

## 今後（未実装）

- **Tier 2**: API Route / Server Action の境界（Clerk・Prisma・fetch のモック）。詳細は実装時に本文へ追記
- **Tier 3**: RTL によるコンポーネント / Playwright による E2E は現フェーズでは非採用（ブラウザ MCP で代替）
