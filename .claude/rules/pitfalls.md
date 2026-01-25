# 避けるべきこと

## パッケージマネージャー

- npm/yarn は使用禁止 → **pnpm のみ**

## ファイル読み取り

- 不必要にファイル全体を読まない
- Serena のシンボルオーバービューツールを活用

## 破壊的変更

- 大規模リファクタリングは事前確認必須
- ユーザー承認なしに実行しない

## 技術スタック

- バージョン変更は承認が必要
- 勝手にアップグレード/ダウングレードしない

## TypeScript

- strict mode は常に有効
- 型エラーは無視しない

## コンポーネント設計

- Client Component をデフォルトにしない
- Server Components 優先、必要時のみ `'use client'`

## Image コンポーネント

- `{isLoading ? <Skeleton /> : <Image />}` パターンは避ける
- この場合 `priority={true}` が効かなくなる
- Skeleton オーバーレイパターンを使用する

## CSS Modules

- 他コンポーネントの CSS Modules をインポートしない（詳細は `styling.md` 参照）
- 新規コンポーネント作成時は必ず専用の CSS Modules を作成する

## キャッシュ

- `connection()` を使って Dynamic Rendering を強制する際は、Suspense 境界内で使用
- Cache Components モードでは `auth()` 単独では Dynamic にならない
