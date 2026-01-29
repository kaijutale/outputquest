"use client";

import styles from "./StrengthTitleInfoClient.module.css";
import Link from "next/link";
import { titleNameData } from "@/shared/data/titleNameDate";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/hooks/useClickSound";

type Props = {
	heroLevel: number;
	isGuestUser: boolean;
};

const StrengthTitleInfoClient = ({ heroLevel, isGuestUser }: Props) => {
	const router = useRouter();
	const { playClickSound } = useClickSound({
		soundPath: "/audio/click-sound_decision.mp3",
		volume: 0.5,
		delay: 190,
	});

	// 勇者のレベルに応じて直近で獲得した称号のIDを取得
	const getLatestTitleId = () => {
		// 最終称号（Lv99）の特別処理
		if (heroLevel >= 99) return 11;

		// レベルに応じた称号インデックスを計算（10レベルごとに新しい称号）
		const titleIndex = Math.min(Math.floor(heroLevel / 10), 9);

		// インデックス → ID（インデックスは0から始まるが、IDは1から始まる）
		return titleIndex + 1;
	};

	// 勇者のレベルに応じて直近で獲得した称号を取得
	const getLatestTitle = () => {
		// ゲストユーザーの場合は「ゲストユーザー」を表示
		if (isGuestUser) return "ゲストユーザー";

		// 最終称号（Lv99）の特別処理
		if (heroLevel >= 99) return `${titleNameData[10].name}（Lv99）`;

		// レベルに応じた称号インデックスを計算（10レベルごとに新しい称号）
		const titleIndex = Math.min(Math.floor(heroLevel / 10), 9);

		// インデックス0は初期称号
		if (titleIndex === 0) {
			return `${titleNameData[0].name}（初期称号）`;
		}

		// それ以外はレベル要件と共に表示
		const requiredLevel = titleIndex * 10;
		return `${titleNameData[titleIndex].name}（Lv${requiredLevel}）`;
	};

	// 現在の称号に対応するクラス名を取得
	const getCurrentTitleClass = () => {
		// ゲストユーザーの場合は専用のクラス名を返す
		if (isGuestUser) {
			return styles["strength-title-detail-content-default"];
		}

		const titleId = getLatestTitleId();

		// 初期称号の場合
		if (titleId === 1) return styles["strength-title-detail-content-default"];

		// 最終称号（Lv99）の特別処理
		if (titleId === 11) {
			return heroLevel >= 99
				? styles["strength-title-detail-content-lv99"]
				: styles["strength-title-detail-content-default"];
		}

		// その他の称号の場合はレベルに応じたクラス名を返す
		const requiredLevel = (titleId - 1) * 10;
		return styles[`strength-title-detail-content-lv${requiredLevel}`];
	};

	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
		e.preventDefault();
		playClickSound(() => router.push(path));
	};

	return (
		<div className={styles["strength-title-info"]}>
			<div className={styles["strength-title-info-content"]}>
				<div className={styles["strength-title-box"]}>
					<h2 className={styles["strength-title-title"]}>称号</h2>
					<div className={styles["strength-title-detail-bg"]}>
						<div className={styles["strength-title-detail"]}>
							<div
								className={`${styles["strength-title-detail-content"]} ${getCurrentTitleClass()}`}
							>
								<h3 className={styles["strength-title-detail-text"]}>{getLatestTitle()}</h3>
							</div>
						</div>
					</div>
					<div className={styles["strength-title-list-link-box"]}>
						<Link
							href="/title"
							className={styles["strength-title-list-link"]}
							onClick={(e) => handleNavigation(e, "/title")}
						>
							称号リストを確認する
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StrengthTitleInfoClient;
