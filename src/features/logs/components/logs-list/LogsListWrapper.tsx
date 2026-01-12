import { auth } from "@clerk/nextjs/server";
import { getAdventureLogs } from "@/features/logs/services/logService";
import LogsList from "./LogsList";

/**
 * サーバーコンポーネント：ログを取得してLogsListに渡す
 */
const LogsListWrapper = async () => {
	const { userId } = await auth();
	const logs = userId ? await getAdventureLogs(userId) : [];

	return <LogsList logs={logs} />;
};

export default LogsListWrapper;
