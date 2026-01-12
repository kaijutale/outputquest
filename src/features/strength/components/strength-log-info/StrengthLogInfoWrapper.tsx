import { auth } from "@clerk/nextjs/server";
import { getAdventureLogs } from "@/features/logs/services/logService";
import StrengthLogInfo from "./StrengthLogInfo";

/**
 * サーバーコンポーネント：ログを取得してStrengthLogInfoに渡す
 */
const StrengthLogInfoWrapper = async () => {
	const { userId } = await auth();
	const logs = userId ? await getAdventureLogs(userId) : [];

	return <StrengthLogInfo logs={logs} />;
};

export default StrengthLogInfoWrapper;
