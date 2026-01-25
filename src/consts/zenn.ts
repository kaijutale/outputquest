import { PlatformType } from "@/features/posts/types";

/**
 * Zenn関連の定数
 *
 * PostCard と DashboardActivityContent で共通使用
 */

/**
 * プラットフォーム情報
 */
export const PLATFORM_INFO: Record<PlatformType, { name: string; favicon: string }> = {
	zenn: {
		name: "Zenn",
		favicon: "https://zenn.dev/images/logo-transparent.png",
	},
};

/**
 * カテゴリー表示用のマッピング
 */
export const CATEGORY_DISPLAY: Record<string, string> = {
	tech: "TECH",
	idea: "IDEA",
};
