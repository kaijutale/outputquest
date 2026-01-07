import { PartyMember, PartyData } from "../types/party.types";

// メンバーIDと必要な勇者レベルの関係
// キー: メンバーID, 値: そのメンバーを獲得するために必要な勇者レベル
export const heroLevelAndMemberRelation: { [key: number]: number } = {
	1: 2,
	2: 5,
	3: 8,
	4: 12,
	5: 18,
	6: 25,
	7: 35,
	8: 45,
	9: 55,
	10: 70,
	11: 85,
	12: 99,
};

// カスタム仲間名の定義
export const customMemberNames: { [key: number]: string } = {
	1: "旅の商人",
	2: "ウォーリアー",
	3: "僧侶",
	4: "森の狩人",
	5: "王国の騎兵",
	6: "老賢者",
	7: "聖騎士",
	8: "オーガ",
	9: "ポセイドン",
	10: "魔王",
	11: "王妃",
	12: "王様",
};

// カスタム仲間説明文の定義
export const customMemberDescriptions: { [key: number]: string } = {
	1: "世界を股にかける商人。珍しい品々と情報に通じている。",
	2: "戦いの技術を磨いた戦士。攻守に優れた頼れる前衛。",
	3: "慈愛の心を持つ聖職者。祈りの力で傷ついた仲間を癒やす。",
	4: "自然と共に生きる狩人。弓矢を用いて遠距離から敵を射抜く。",
	5: "王国に仕える忠実な兵士。機動力を活かした戦いを得意とする。",
	6: "深淵な知識を持つ賢者。古代の魔法と知恵で旅を導く。",
	7: "神聖な加護を受けた騎士。邪悪な力を退ける聖なる盾。",
	8: "強靭な肉体を持つ巨漢。その剛腕はあらゆるものを粉砕する。",
	9: "大海原を統べる海の神。荒波を操り、敵を深海へと誘う。",
	10: "闇を統べる王。圧倒的なカリスマと魔力で他を陵駕する。",
	11: "国母として慕われる王妃。優雅な振る舞いで味方を鼓舞する。",
	12: "国を治める賢王。王としての威厳と統率力で皆を導く。",
};

// 仲間画像パスの定義
export const customMemberImages: { [key: number]: string } = {
	1: "merchant_icon.png",
	2: "warrior_icon.png",
	3: "priest_icon.png",
	4: "bow_icon.png",
	5: "paladin_icon.png",
	6: "old_wise_man_icon.png",
	7: "knight_icon.png",
	8: "ogre_hero_icon.png",
	9: "poseidon_icon.png",
	10: "demon_icon.png",
	11: "queen_icon.png",
	12: "king_icon.png",
};

// 未加入仲間のシルエット画像のファイル名定義
export const customMemberSilhouetteImages: { [key: number]: string } = {
	1: "merchant_silhouette_icon.png",
	2: "warrior_silhouette_icon.png",
	3: "monk_silhouette_icon.png",
	4: "bow_silhouette_icon.png",
	5: "paladin_silhouette_icon.png",
	6: "old_wise_man_silhouette_icon.png",
	7: "knight_silhouette_icon.png",
	8: "ogre_hero_silhouette_icon.png",
	9: "poseidon_silhouette_icon.png",
	10: "demon_silhouette_icon.png",
	11: "queen_silhouette_icon.png",
	12: "king_silhouette_icon.png",
};

// レベルに応じて獲得できる仲間かどうかを判定する関数
export const isAcquiredByHeroLevel = (memberId: number, heroLevel: number): boolean => {
	// そのメンバーIDに必要なレベルが設定されているか確認
	const requiredLevel = heroLevelAndMemberRelation[memberId];

	// 設定されていない場合、または勇者のレベルが必要レベルに達していない場合はfalse
	if (!requiredLevel || heroLevel < requiredLevel) {
		return false;
	}

	return true;
};

// 仲間のデータ生成関数
const generateMembers = (heroLevel: number = 1): PartyMember[] => {
	// 12人の仲間を定義
	return Array(12)
		.fill(null)
		.map((_, index) => {
			const id = index + 1;
			const acquired = isAcquiredByHeroLevel(id, heroLevel);
			return {
				id,
				name: acquired ? customMemberNames[id] : null,
				description: acquired ? customMemberDescriptions[id] : null,
				imagePath: acquired ? customMemberImages[id] : null,
				acquired,
			};
		});
};

// 初期状態では仮のレベル1として仲間を生成
const initialPartyMembers = generateMembers(1);

// エクスポートするデータ
export const partyMemberData: PartyData = {
	partyMembers: initialPartyMembers,
};

// レベルに応じて仲間データを更新する関数
export const updatePartyMembersByLevel = (level: number): PartyMember[] => {
	return generateMembers(level);
};
