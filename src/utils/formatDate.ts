/**
 * 日付フォーマットユーティリティ
 *
 * 複数のコンポーネントで使用される日付フォーマット関数を統一
 */

/**
 * 日付を「2025年1月25日」形式でフォーマット
 */
export const formatDate = (date: Date | string): string => {
	const d = new Date(date);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(d);
};

/**
 * 日付を「2025/1/25」形式でフォーマット
 * PostCard, DashboardActivityContent で使用
 */
export const formatDateShort = (date: Date | string | undefined): string => {
	if (!date) return "";
	const d = new Date(date);
	return d.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});
};

/**
 * 日付を「2025/01/25 14:30:00」形式でフォーマット（時分秒含む）
 * logService で使用
 */
export const formatDateWithTime = (date: Date): string => {
	return `${date.getFullYear()}/${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
		.getHours()
		.toString()
		.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
		.getSeconds()
		.toString()
		.padStart(2, "0")}`;
};
