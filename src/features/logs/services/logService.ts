import "server-only";

import { prisma } from "@/lib/prisma";
import { heroLevelAndItemRelation, customItemNames } from "@/features/items/data/itemsData";
import {
	heroLevelAndMemberRelation,
	customMemberNames,
} from "@/features/party/data/partyMemberData";
import { titleNameData } from "@/shared/data/titleNameDate";
import { getUser } from "@/features/user/_lib/fetcher";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { formatDateWithTime } from "@/utils/formatDate";

interface Article {
	id: number | string;
	title: string;
	publishedAt?: string | null;
	date?: string | Date;
}

/**
 * Syncs the adventure logs for a user.
 * It deletes all existing logs and regenerates them based on the provided articles.
 */
export const syncAdventureLogs = async (userId: string, articles: Article[]) => {
	if (!articles || articles.length === 0) return;

	// Sort articles by date (oldest to newest)
	const sortedArticles = [...articles].sort((a, b) => {
		const dateA = new Date(getDateStr(a)).getTime();
		const dateB = new Date(getDateStr(b)).getTime();
		return dateA - dateB;
	});

	const logsToCreate: {
		userId: string;
		type: string;
		content: string;
		occurredAt: Date;
	}[] = [];

	let currentLevel = 0;

	// Process each article
	for (const article of sortedArticles) {
		currentLevel++;
		const baseDate = new Date(getDateStr(article));

		// Define offsets to ensure logical chronological order:
		// 1. Level Up (Base Time) -> Happens FIRST
		// 2. Unlocks (Item/Party/Title) -> Happen AFTER Level Up

		// In DESC sort (Newest First), the visual order will be:
		// Top: Title (+30ms)
		// ...: Party (+20ms)
		// ...: Item (+10ms)
		// Bottom: Level Up (+0ms)

		// 1. Level Up Log (Base Time + 0ms)
		logsToCreate.push({
			userId,
			type: "LEVEL_UP",
			content: `経験値を1獲得！勇者は「Lv${currentLevel}」にあがった！`,
			occurredAt: baseDate, // +0ms (Earliest)
		});

		// 2. Item Unlock Logs (Base Time + 10ms)
		for (const [itemIdStr, reqLevel] of Object.entries(heroLevelAndItemRelation)) {
			if (reqLevel === currentLevel) {
				const name = customItemNames[Number(itemIdStr)];
				if (name) {
					logsToCreate.push({
						userId,
						type: "ITEM_GET",
						content: `勇者は「${name}」を手に入れた！`,
						occurredAt: new Date(baseDate.getTime() + 10), // +10ms
					});
				}
			}
		}

		// 3. Party Member Unlock Logs (Base Time + 20ms)
		for (const [memberIdStr, reqLevel] of Object.entries(heroLevelAndMemberRelation)) {
			if (reqLevel === currentLevel) {
				const name = customMemberNames[Number(memberIdStr)];
				if (name) {
					logsToCreate.push({
						userId,
						type: "PARTY_JOIN",
						content: `「${name}」が仲間に加わった！`,
						occurredAt: new Date(baseDate.getTime() + 20), // +20ms
					});
				}
			}
		}

		// 4. Title Unlock Logs (Base Time + 30ms)
		if (currentLevel === 1) {
			const title = titleNameData.find((t) => t.id === 1);
			if (title) {
				logsToCreate.push({
					userId,
					type: "TITLE_GET",
					content: `称号「${title.name}」を獲得した！`,
					occurredAt: new Date(baseDate.getTime() + 30), // +30ms
				});
			}
		}
		if (currentLevel % 10 === 0) {
			const titleId = currentLevel / 10 + 1;
			const title = titleNameData.find((t) => t.id === titleId);
			if (title) {
				logsToCreate.push({
					userId,
					type: "TITLE_GET",
					content: `称号「${title.name}」を獲得した！`,
					occurredAt: new Date(baseDate.getTime() + 30), // +30ms
				});
			}
		}
	}

	// Transaction: Delete all old logs and insert new ones
	await prisma.$transaction([
		prisma.adventureLog.deleteMany({ where: { userId } }),
		prisma.adventureLog.createMany({ data: logsToCreate }),
	]);
};

const getDateStr = (article: Article): string => {
	return (
		article.publishedAt ??
		(typeof article.date === "string" ? article.date : new Date().toISOString())
	);
};

/**
 * ログをフォーマットするための型
 */
export interface FormattedLog {
	id: string;
	type: string;
	content: string;
	occurredAt: Date;
	formattedDate: string;
}

/**
 * サーバーサイドでAdventureLogを取得する関数
 * Zenn連携しているユーザーのみログを返す
 */
export const getAdventureLogs = async (clerkId: string): Promise<FormattedLog[]> => {
	// ユーザーを取得
	const user = await prisma.user.findUnique({
		where: { clerkId },
		select: { id: true, zennUsername: true },
	});

	// ユーザーが存在しない、またはZenn未連携の場合は空配列
	if (!user || !user.zennUsername) {
		return [];
	}

	// AdventureLogを取得
	const logs = await prisma.adventureLog.findMany({
		where: { userId: user.id },
		orderBy: { occurredAt: "desc" },
	});

	// フォーマットして返す
	return logs.map((log) => ({
		id: log.id,
		type: log.type,
		content: log.content,
		occurredAt: log.occurredAt,
		formattedDate: formatDateWithTime(log.occurredAt),
	}));
};

/**
 * 冒険ログを同期・取得する共通ユーティリティ関数
 *
 * LogsListWrapper と StrengthLogInfoWrapper で共通して使用される
 * データフェッチロジックを抽象化
 *
 * @returns 同期済みの冒険ログ配列（未ログインまたはZenn未連携の場合は空配列）
 */
export const getAdventureLogsWithSync = async (): Promise<FormattedLog[]> => {
	// ユーザー情報を取得（Request Memoization + use cache）
	const user = await getUser();

	// 未ログインまたはZenn未連携の場合は空配列を返す
	if (!user?.zennUsername) {
		return [];
	}

	// Zenn記事を取得してログを同期
	const articles = await getZennArticles(user.zennUsername, { fetchAll: true });
	await syncAdventureLogs(user.id, articles);

	// 同期後のログを取得して返す
	return await getAdventureLogs(user.clerkId);
};
