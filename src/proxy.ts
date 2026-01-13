import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(() => {
	// ゲストユーザーでも全ページ閲覧できるようにするため、
	// middlewareでのリダイレクト処理を削除し、すべてのリクエストを許可する。
	// 認証状態のチェックは、各ページのコンポーネント層に委ねる。
	return;
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
