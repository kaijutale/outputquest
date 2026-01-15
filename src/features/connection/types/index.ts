// グローバル変数の型拡張
declare global {
	interface Window {
		__clerk_custom_signout_handler?: () => Promise<void>;
	}
}

// ユーザープロフィールの型定義
export interface UserInfo {
	id: string;
	clerkId: string;
	displayName?: string;
	zennUsername?: string;
	profileImage?: string;
	zennArticleCount: number;
	level: number;
}

// Zenn記事の型定義（API変換後）
export interface ZennArticle {
	id: string;
	title: string;
	url: string;
	category: string;
	publishedAt: string;
	date: string;
	platformType: "zenn";
	emoji: string;
}
