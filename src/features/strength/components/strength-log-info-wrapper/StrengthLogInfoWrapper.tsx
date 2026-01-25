import { getAdventureLogsWithSync } from "@/features/logs/services/logService";
import * as Strength from "@/features/strength/components";

/**
 * StrengthLogInfoWrapper (Server Component)
 *
 * 冒険ログを同期・取得してStrengthLogInfoに渡す
 */
const StrengthLogInfoWrapper = async () => {
	const logs = await getAdventureLogsWithSync();
	return <Strength.StrengthLogInfo logs={logs} />;
};

export default StrengthLogInfoWrapper;
