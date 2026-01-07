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
	1: "アイテムの売買を生業とする商人。旅の相場に詳しい。",
	2: "剣の道を志す若者。力強い一撃が得意。",
	3: "素手で戦う武闘家。己の肉体を極めんとする。",
	4: "弓矢の名手。遠くの敵も逃さない。",
	5: "王国に忠誠を誓う騎士。攻守のバランスが良い。",
	6: "古の魔法を知る賢者。豊富な知識で一行を導く。",
	7: "神聖な力を帯びた剣技を操る女騎士。",
	8: "圧倒的な腕力を持つ鬼の戦士。情に厚い。",
	9: "異界から迷い込んだ悪魔。契約により力を貸してくれる。",
	10: "強大な魔力を持つ高位の悪魔。強力な魔法を操る。",
	11: "国を統べる女王。そのカリスマ性で味方を鼓舞する。",
	12: "かつて世界を救ったといわれる伝説の王。",
};

// 仲間画像パスの定義
// 仲間画像パスの定義
export const customMemberImages: { [key: number]: string } = {
	1: "merchant_dot01.png",
	2: "warrior_dot01.png",
	3: "priest_dot01.png",
	4: "bow_dot01.png",
	5: "paladin_dot01.png",
	6: "old_wise_man_dot01.png",
	7: "knight_dot01.png",
	8: "ogre_hero_dot01.png",
	9: "demon01_dot01.png",
	10: "demon02_dot01.png",
	11: "queen_dot01.png",
	12: "king_dot01.png",
};

// 未加入仲間のシルエット画像のファイル名定義
// public/images/party-page/unacquired-icon/ 配下のファイル名
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
