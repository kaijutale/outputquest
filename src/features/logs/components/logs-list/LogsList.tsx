import styles from "./LogsList.module.css";
import type { FormattedLog } from "@/features/logs/services/logService";

interface LogsListProps {
	logs: FormattedLog[];
}

const LogsList = ({ logs }: LogsListProps) => {
	// ログがない場合のデフォルトメッセージ
	const displayLogs =
		logs.length > 0 ? logs.map((log) => `${log.formattedDate} ${log.content}`) : [];

	return (
		<ul className={styles["logs-page-list"]}>
			{displayLogs.length === 0 ? (
				<li className={styles["logs-page-list-item"]}>
					<p className={styles["logs-page-list-item-text"]}>
						ゲストユーザーのため冒険ログはありません
					</p>
				</li>
			) : (
				displayLogs.map((log, index) => (
					<li key={index} className={styles["logs-page-list-item"]}>
						<p className={styles["logs-page-list-item-text"]}>{log}</p>
					</li>
				))
			)}
		</ul>
	);
};

export default LogsList;
