"use client";

import { useEffect, useState } from "react";
import styles from "./LogsList.module.css";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";

const LOGS_STORAGE_KEY = "adventure_logs";

const LogsList = () => {
	const [logs, setLogs] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// APIからログを取得
		const fetchLogs = async () => {
			try {
				const res = await fetch("/api/logs");
				const data = await res.json();
				if (data.success && Array.isArray(data.logs)) {
					const formattedLogs = data.logs.map((log: any) => {
						const date = new Date(log.occurredAt);
						const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
							.toString()
							.padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
							.getHours()
							.toString()
							.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
							.getSeconds()
							.toString()
							.padStart(2, "0")}`;
						return `${formattedDate} ${log.content}`;
					});
					setLogs(formattedLogs);
				} else {
					setLogs([]);
				}
			} catch (err) {
				console.error("Failed to fetch logs:", err);
				setLogs([]);
			} finally {
				setLoading(false);
			}
		};

		fetchLogs();
	}, []);

	return (
		<ul className={styles["logs-page-list"]}>
			{loading ? (
				<li className={styles["logs-page-list-item"]}>
					<div className={styles["logs-page-list-item-loading-text"]}>
						<LoadingIndicator text="読み込み中" className={styles["loading-indicator"]} />
					</div>
				</li>
			) : logs.length === 0 ? (
				<li className={styles["logs-page-list-item"]}>
					<p className={styles["logs-page-list-item-text"]}>表示できる冒険ログはまだありません</p>
				</li>
			) : (
				logs.map((log, index) => (
					<li key={index} className={styles["logs-page-list-item"]}>
						<p className={styles["logs-page-list-item-text"]}>{log}</p>
					</li>
				))
			)}
		</ul>
	);
};

export default LogsList;
