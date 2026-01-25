import { getAdventureLogsWithSync } from "@/features/logs/services/logService";
import * as Logs from "@/features/logs/components";

/**
 * LogsListWrapper (Server Component)
 *
 * 冒険ログを同期・取得してLogsListに渡す
 */
const LogsListWrapper = async () => {
	const logs = await getAdventureLogsWithSync();
	return <Logs.LogsList logs={logs} />;
};

export default LogsListWrapper;
