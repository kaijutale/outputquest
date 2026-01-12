# アーキテクチャ

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # メインレイアウトグループ
│   ├── api/               # API Routes
│   │   ├── ai/            # AI/LLM (Gemini)
│   │   ├── user/          # ユーザー管理
│   │   ├── webhooks/      # Clerk webhooks
│   │   └── zenn/          # Zenn API連携
│   └── layout.tsx         # ルートレイアウト
├── components/            # 共有コンポーネント
│   ├── auth/              # 認証
│   ├── common/            # 共通UI
│   ├── elements/          # 基本プリミティブ
│   ├── layout/            # レイアウト
│   └── ui/                # shadcn/ui
├── features/              # 機能モジュール
│   └── <feature>/
│       ├── components/    # 機能コンポーネント
│       ├── api/           # API呼び出し
│       ├── hooks/         # カスタムhooks
│       ├── types/         # 型定義
│       └── utils/         # ユーティリティ
├── config/                # 環境設定
├── consts/                # 不変定数
├── contexts/              # React Context
├── hooks/                 # グローバルhooks
├── lib/                   # ライブラリ/ユーティリティ
├── shared/                # 共有データ
├── types/                 # グローバル型定義
└── utils/                 # ユーティリティ関数
```

## データフロー

- **認証**: Clerk → Server Components / API Routes
- **Zenn連携**: Zenn RSS API → Server Components → Client UI
- **DB**: Prisma ORM → Supabase PostgreSQL
- **AI**: Client → `/api/ai/analyze-articles` → Gemini (Vercel AI SDK)

## 状態管理

- **グローバル**: React Context (AudioContext, HeroContext - 10分TTL)
- **ローカル**: useState, useLocalStorage
- **サーバー**: Server Components で直接フェッチ

## 主要機能

| ページ | 機能 |
|--------|------|
| Dashboard | レベル、投稿数、報酬表示 |
| Posts (学びの書) | Zenn記事一覧 |
| Explore (記事探索) | AI記事テーマ提案 (Gemini 2.5 Pro) |
| Strength (つよさ) | レベル、称号、冒険ログ |
| Party (なかま) | キャラクターコレクション |
| Items (アイテム) | アイテムコレクション |
| Connection (連携) | Clerk認証 + Zennアカウント連携 |
