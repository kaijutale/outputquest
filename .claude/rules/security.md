# セキュリティ

## 環境変数

- `.env` ファイルは**絶対にコミットしない**
- テンプレートは `.env.example`
- クライアント公開キーは `NEXT_PUBLIC_` プレフィックス

### 機密キー（サーバーのみ）

- Clerk secrets
- Supabase service role key
- Gemini API key

## 認証

- Clerk がフロー全体を管理
- Webhook は `CLERK_WEBHOOK_SIGNING_SECRET` で署名検証
- ミドルウェアでルート保護

## データベース

- Prisma クエリはパラメータ化（SQLインジェクション対策済み）
- Supabase service role key はサーバーのみで使用
- クライアントには絶対に公開しない

## ログ出力

- **機密情報のログ出力禁止**
  - PII（個人識別情報）
  - シークレット
  - トークン
- 適切なレベルで出力: `console.debug`, `console.log`, `console.error`
