"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./StrengthLogInfo.module.css";
import { fetchZennArticles } from "@/features/posts/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/components/common/audio/click-sound/ClickSound";
import LoadingIndicator from "@/components/common/loading-indicator/LoadingIndicator";

const StrengthLogInfo = () => {
	const [logs, setLogs] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const hasSynced = useRef(false);

	const router = useRouter();
	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190, // 190ミリ秒 = 0.19秒の遅延
	});

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	useEffect(() => {
		// コンポーネントマウント時に実行される
		const initializeLogs = async () => {
			if (hasSynced.current) return;
			hasSynced.current = true;

			try {
				await syncAndFetchLogs();
			} catch (err) {
				console.error("ログの初期化エラー:", err);
				setError("ログデータの初期化中にエラーが発生しました。");
				setLoading(false);
			}
		};

		initializeLogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // 依存配列は空のまま（初回マウント時のみ実行）

	// ログを同期・取得する関数
	const syncAndFetchLogs = async () => {
		try {
			setLoading(true);

			// 1. Zennユーザー名取得
			const userRes = await fetch("/api/user");
			const userData = await userRes.json();
			let username = "aoyamadev";
			if (userData.success && userData.user.zennUsername) {
				username = userData.user.zennUsername;
			}

			// 2. Zenn記事取得（すべての記事）
			const articles = await fetchZennArticles(username, {
				fetchAll: true,
			});

			// 3. ログ同期APIを呼び出し（記事データを送信してDBを更新）
			await fetch("/api/logs/sync", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ articles }),
			});

			// 4. DBから最新のログを取得
			const logsRes = await fetch("/api/logs");
			const logsData = await logsRes.json();

			if (logsData.success && Array.isArray(logsData.logs)) {
				const formattedLogs = logsData.logs.map((log: any) => {
					const date = new Date(log.occurredAt);
					const formattedDate = formatDate(date);
					return `${formattedDate} ${log.content}`;
				});
				setLogs(formattedLogs);
			} else {
				// ログがない場合
				setLogs(generateDefaultLogs());
			}
		} catch (err) {
			console.error("ログ同期エラー:", err);
			// エラー時はデフォルトログ
			setLogs(generateDefaultLogs());
		} finally {
			setLoading(false);
		}
	};

	// 日付をフォーマットする関数
	const formatDate = (date: Date): string => {
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

	// デフォルトのログを生成
	const generateDefaultLogs = (): string[] => {
		return ["表示できる冒険ログはまだありません"];
	};

	// エラー表示
	if (error) {
		return (
			<div className={styles["strength-log-info"]}>
				<div className={styles["strength-log-info-content"]}>
					<div className={styles["strength-log-box"]}>
						<h2 className={styles["strength-log-title"]}>冒険ログ</h2>
						<div className={styles["error-text"]}>{error}</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles["strength-log-info"]}>
			<div className={styles["strength-log-info-content"]}>
				<div className={styles["strength-log-box"]}>
					<h2 className={styles["strength-log-title"]}>冒険ログ</h2>
					<div className={styles["strength-log-list-content"]}>
						<div className={styles["strength-log-list-box"]}>
							<ul className={styles["strength-log-list"]}>
								{loading ? (
									<li className={styles["strength-log-item"]}>
										<div className={styles["strength-log-loading-text"]}>
											<LoadingIndicator text="読み込み中" className={styles["loading-indicator"]} />
										</div>
									</li>
								) : (
									// 最大15件のログのみ表示
									logs.slice(0, 15).map((log, index) => (
										<li key={index} className={styles["strength-log-item"]}>
											<p className={styles["strength-log-text"]}>{log}</p>
										</li>
									))
								)}
							</ul>
						</div>
					</div>
					<div className={styles["strength-log-link-box"]}>
						<Link
							href="/logs"
							className={styles["strength-log-link"]}
							onClick={(e) => handleNavigation(e, "/logs")}
						>
							過去のログを全て確認する
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StrengthLogInfo;
