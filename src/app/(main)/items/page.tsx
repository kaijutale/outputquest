import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { getPageMetadata } from "@/config/metadata";
import styles from "./ItemsPage.module.css";
import * as Items from "@/features/items/components";
import { customItemImages, customItemSilhouetteImages } from "@/features/items/data/itemsData";

export const metadata: Metadata = getPageMetadata("items");

// ファーストビュー用のプリロード画像（最初の8個分）
const PRELOAD_ITEM_COUNT = 8;

const ItemsPage = () => {
	// プリロードする画像パスを生成
	const preloadImages = [
		// プレート画像（共通）
		"/images/plate/plate01.png",
		// 宝箱画像
		"/images/items-page/treasure-chest-close.png",
		"/images/items-page/treasure-chest-open.png",
		// 最初の8個分のアイテム画像
		...Object.entries(customItemImages)
			.slice(0, PRELOAD_ITEM_COUNT)
			.map(([, filename]) => `/images/items-page/acquired-icon/${filename}`),
		// 最初の8個分のシルエット画像
		...Object.entries(customItemSilhouetteImages)
			.slice(0, PRELOAD_ITEM_COUNT)
			.map(([, filename]) => `/images/items-page/unacquired-icon/${filename}`),
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
			<h1 className={`${styles["items-title"]}`}>アイテム</h1>
			<div className={`${styles["items-container"]}`}>
				<div className={`${styles["items-header"]}`}>
					<p>勇者が入手したアイテムを確認できます。</p>
					<p>入手できるアイテムは最大で30個です。</p>
					<p>アイテムをクリックすると、アイテムの詳細を確認できます。</p>
				</div>

				<hr className={styles["items-line"]} />

				<Suspense fallback={<Items.ItemListSkeleton />}>
					<Items.ItemCardList />
				</Suspense>
			</div>
		</>
	);
};

export default ItemsPage;
