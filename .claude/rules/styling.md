# スタイリング規約

## CSS 変数

### 定義場所

- グローバル変数は `src/styles/globals.css` の `:root` で定義

### 命名規則

```
--color-{用途}-{詳細}
```

| 用途 | 例 | 説明 |
|------|-----|------|
| bg | `--color-bg-panel` | 背景色 |
| text | `--color-text-primary` | テキスト色 |
| border | `--color-border-default` | ボーダー色 |
| accent | `--color-accent-primary` | アクセントカラー |

### 注意点

- 曖昧な命名を避ける（例: `--color-bg-component` は NG）
- 実際の使用箇所に合った具体的な名前を付ける

## Tailwind CSS

- ユーティリティファーストで記述
- 複雑なスタイルは CSS Modules に切り出す
- カスタム値は `tailwind.config.ts` で定義

## CSS Modules

- コンポーネント固有のスタイルに使用
- ファイル名: `ComponentName.module.css`
- クラス名: ケバブケース（例: `user-info-list`）
- CSS 変数を積極的に活用し、ハードコードを避ける
