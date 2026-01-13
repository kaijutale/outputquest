import { connection } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getZennArticles } from "@/features/zenn/_lib/fetcher";
import { getAdventureLogs, syncAdventureLogs } from "@/features/logs/services/logService";
import StrengthLogInfo from "./StrengthLogInfo";

/**
 * StrengthLogInfoWrapper (Server Component)
 *
 * 冒険ログを同期・取得してStrengthLogInfoに渡す
 *
 * データフェッチ:
 * - connection() + auth(): ユーザー認証（動的）
 * - prisma: DBからユーザー情報取得
 * - getZennArticles(): Zenn記事取得（Request Memoization + use cache）
 * - syncAdventureLogs(): ログ同期
 * - getAdventureLogs(): DBからログ取得
 *
 * 注意: connection()を呼ばないとキャッシュされ、ユーザー間でデータが混在する
 */
const StrengthLogInfoWrapper = async () => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	const { userId } = await auth();

	if (!userId) {
		return <StrengthLogInfo logs={[]} />;
	}

	// ユーザー情報を取得
	const user = await prisma.user.findUnique({
		where: { clerkId: userId },
		select: { id: true, zennUsername: true },
	});

	// Zenn未連携の場合は空のログを表示
	if (!user?.zennUsername) {
		return <StrengthLogInfo logs={[]} />;
	}

	// Zenn記事を取得してログを同期
	const articles = await getZennArticles(user.zennUsername, { fetchAll: true });
	await syncAdventureLogs(user.id, articles);

	// 同期後のログを取得して表示
	const logs = await getAdventureLogs(userId);

	return <StrengthLogInfo logs={logs} />;
};

export default StrengthLogInfoWrapper;
