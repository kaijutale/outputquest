import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./ItemDetailPage.module.css";
import * as ItemDetail from "@/features/item-detail/components";
import ItemDetailCard from "@/features/item-detail/components/item-detail-card/ItemDetailCard";
import { generateItemMetadata } from "@/features/item-detail/metadata/generateItemMetadata";

export async function generateStaticParams() {
	// 1から30までのアイテムIDを生成
	return Array.from({ length: 30 }, (_, i) => ({
		itemId: String(i + 1),
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ itemId: string }>;
}): Promise<Metadata> {
	const { itemId } = await params;
	const itemIdNum = parseInt(itemId);
	return generateItemMetadata(itemIdNum);
}

export default async function ItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
	const { itemId } = await params;
	const itemIdNum = parseInt(itemId);

	if (isNaN(itemIdNum) || itemIdNum < 1 || itemIdNum > 30) {
		notFound();
	}

	return (
		<>
			<h1 className={styles["item-detail-page-title"]}>アイテム詳細</h1>
			<div className={styles["item-detail-container"]}>
				{/* Server Component + Suspense パターン */}
				<Suspense fallback={<ItemDetail.ItemDetailSkeleton />}>
					<ItemDetailCard itemId={itemIdNum} />
				</Suspense>

				<hr />

				<ItemDetail.ItemDetailFooter />
			</div>
		</>
	);
}
