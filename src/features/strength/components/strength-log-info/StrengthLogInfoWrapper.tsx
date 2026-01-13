import { connection } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAdventureLogs } from "@/features/logs/services/logService";
import StrengthLogInfo from "./StrengthLogInfo";

/**
 * StrengthLogInfoWrapper (Server Component)
 *
 * 冒険ログを取得してStrengthLogInfoに渡す
 *
 * データフェッチ:
 * - connection() + auth(): ユーザー認証（動的）
 * - getAdventureLogs(): DBからログ取得
 *
 * 注意: connection()を呼ばないとキャッシュされ、ユーザー間でデータが混在する
 */
const StrengthLogInfoWrapper = async () => {
	// Dynamic Renderingを強制（cacheComponents有効時のプリレンダリング対策）
	await connection();

	const { userId } = await auth();
	const logs = userId ? await getAdventureLogs(userId) : [];

	return <StrengthLogInfo logs={logs} />;
};

export default StrengthLogInfoWrapper;
