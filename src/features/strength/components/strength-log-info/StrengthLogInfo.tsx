"use client";

import styles from "./StrengthLogInfo.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/hooks/useClickSound";
import type { FormattedLog } from "@/features/logs/services/logService";

interface StrengthLogInfoProps {
	logs: FormattedLog[];
}

const StrengthLogInfo = ({ logs }: StrengthLogInfoProps) => {
	const router = useRouter();
	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190,
	});

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	// ログがない場合のデフォルトメッセージ
	const displayLogs =
		logs.length > 0
			? logs.slice(0, 15).map((log) => `${log.formattedDate} ${log.content}`)
			: ["ゲストユーザーのため冒険ログはありません"];

	return (
		<div className={styles["strength-log-info"]}>
			<div className={styles["strength-log-info-content"]}>
				<div className={styles["strength-log-box"]}>
					<h2 className={styles["strength-log-title"]}>冒険ログ</h2>
					<div className={styles["strength-log-list-content"]}>
						<div className={styles["strength-log-list-box"]}>
							<ul className={styles["strength-log-list"]}>
								{displayLogs.map((log, index) => (
									<li key={index} className={styles["strength-log-item"]}>
										<p className={styles["strength-log-text"]}>{log}</p>
									</li>
								))}
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
