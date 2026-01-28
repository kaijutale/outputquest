import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./PartyMemberPage.module.css";
import * as PartyMember from "@/features/party-member/components";
import PartyMemberDetailCard from "@/features/party-member/components/party-member-detail-card/PartyMemberDetailCard";
import { generatePartyMemberMetadata } from "@/features/party-member/metadata/generatePartyMemberMetadata";

export async function generateStaticParams() {
	// 1から30までのパーティメンバーIDを生成
	return Array.from({ length: 30 }, (_, i) => ({
		partyId: String(i + 1),
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ partyId: string }>;
}): Promise<Metadata> {
	const { partyId } = await params;
	const partyIdNum = parseInt(partyId);
	return generatePartyMemberMetadata(partyIdNum);
}

export default async function PartyMemberPage({
	params,
}: {
	params: Promise<{ partyId: string }>;
}) {
	const { partyId } = await params;
	const partyIdNum = parseInt(partyId);

	if (isNaN(partyIdNum) || partyIdNum < 1 || partyIdNum > 30) {
		notFound();
	}

	return (
		<>
			<h1 className={`${styles["party-member-page-title"]}`}>なかま詳細</h1>

			<div className={styles["party-member-container"]}>
				{/* Server Component + Suspense パターン */}
				<Suspense fallback={<PartyMember.PartyMemberDetailSkeleton />}>
					<PartyMemberDetailCard partyId={partyIdNum} />
				</Suspense>

				<hr />

				<PartyMember.PartyMemberFooter />
			</div>
		</>
	);
}
