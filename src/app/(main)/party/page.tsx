import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { getPageMetadata } from "@/config/metadata";
import styles from "./PartyPage.module.css";
import * as Party from "@/features/party/components";
import {
	customMemberImages,
	customMemberSilhouetteImages,
} from "@/features/party/data/partyMemberData";

export const metadata: Metadata = getPageMetadata("party");

// ファーストビュー用のプリロード画像（最初の8人分）
const PRELOAD_MEMBER_COUNT = 8;

const PartyPage = () => {
	// プリロードする画像パスを生成
	const preloadImages = [
		// プレート画像（共通）
		"/images/plate/plate01.png",
		// 最初の8人分の仲間画像
		...Object.entries(customMemberImages)
			.slice(0, PRELOAD_MEMBER_COUNT)
			.map(([, filename]) => `/images/party-page/acquired-icon/${filename}`),
		// 最初の8人分のシルエット画像
		...Object.entries(customMemberSilhouetteImages)
			.slice(0, PRELOAD_MEMBER_COUNT)
			.map(([, filename]) => `/images/party-page/unacquired-icon/${filename}`),
	];

	return (
		<>
			{/* Suspense 前に画像をプリロード（非表示） */}
			<div aria-hidden="true" className={styles["preload-images"]}>
				{preloadImages.map((src) => (
					<Image key={src} src={src} width={1} height={1} alt="" priority />
				))}
			</div>

			<div className={styles["title-bg"]}></div>
			<h1 className={`${styles["party-title"]}`}>なかま</h1>
			<div className={`${styles["party-container"]}`}>
				<div className={`${styles["party-header"]}`}>
					<p>勇者の仲間を確認できます。</p>
					<p>仲間になるキャラクターは最大で12人です。</p>
					<p>仲間をクリックすると、仲間の詳細を確認できます。</p>
				</div>

				<hr className={styles["party-line"]} />

				<Suspense fallback={<Party.PartyListSkeleton />}>
					<Party.PartyMemberCardList />
				</Suspense>
			</div>
		</>
	);
};

export default PartyPage;
