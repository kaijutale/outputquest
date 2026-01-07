import { ReactNode } from "react";
import { partyMemberData } from "@/features/party/data/partyMemberData";

// パーティメンバーデータの型定義
export interface PartyMemberData {
	id: number;
	name: string;
	description: string;
	rarity: ReactNode;
	rarityType: "normal" | "rare" | "superRare";
}

// パーティメンバーデータを生成する関数
export const generatePartyMemberData = (
	partyId: number,
	isAcquired: boolean,
	rarityComponents: { normal: ReactNode; rare: ReactNode; superRare: ReactNode }
): PartyMemberData | null => {
	if (!isAcquired) {
		return null;
	}

	// 定義データからアイテム名と説明文を取得
	const partyMember = partyMemberData.partyMembers.find(
		(partyMember) => partyMember.id === partyId
	);
	const partyMemberName =
		partyMember && partyMember.name ? partyMember.name : `パーティメンバー${partyId}`;
	const partyMemberDescription =
		partyMember && partyMember.description
			? partyMember.description
			: `これは${partyMemberName}の説明です。このパーティメンバーは様々な効果を持っています。`;

	return {
		id: partyId,
		name: partyMemberName,
		description: partyMemberDescription,
		rarity:
			partyId >= 11
				? rarityComponents.superRare
				: partyId >= 7
					? rarityComponents.rare
					: rarityComponents.normal,
		rarityType: partyId >= 11 ? "superRare" : partyId >= 7 ? "rare" : "normal",
	};
};
