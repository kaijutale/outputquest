import { Item, ItemsData } from "../types/items.types";

// キー（アイテムID）と値（勇者のレベル）の関係
export const heroLevelAndItemRelation: { [key: number]: number } = {
	1: 3,
	2: 6,
	3: 9,
	4: 12,
	5: 15,
	6: 18,
	7: 21,
	8: 24,
	9: 27,
	10: 30,
	11: 33,
	12: 36,
	13: 39,
	14: 42,
	15: 45,
	16: 48,
	17: 51,
	18: 54,
	19: 57,
	20: 60,
	21: 63,
	22: 66,
	23: 69,
	24: 72,
	25: 75,
	26: 80,
	27: 85,
	28: 90,
	29: 95,
	30: 99,
};

// アイテムのタイプ定義
const customItemType: { [key: number]: string } = {
	// 全てアイテムとする
	1: "item",
	2: "item",
	3: "item",
	4: "item",
	5: "item",
	6: "item",
	7: "item",
	8: "item",
	9: "item",
	10: "item",
	11: "item",
	12: "item",
	13: "item",
	14: "item",
	15: "item",
	16: "item",
	17: "item",
	18: "item",
	19: "item",
	20: "item",
	21: "item",
	22: "item",
	23: "item",
	24: "item",
	25: "item",
	26: "item",
	27: "item",
	28: "item",
	29: "item",
	30: "item",
};

// カスタムアイテム名の定義
export const customItemNames: { [key: number]: string } = {
	1: "やくそう",
	2: "骨付きにく",
	3: "不思議なきのみ",
	4: "太陽の果実",
	5: "月の果実",
	6: "鉱石",
	7: "金の鉱石",
	8: "プラチナの鉱石",
	9: "ダイヤの鉱石",
	10: "ほしのかけら",
	11: "学びの書",
	12: "冒険の書",
	13: "ちからのたね",
	14: "まもりのたね",
	15: "すばやさのたね",
	16: "いのちのたね",
	17: "おとのたね",
	18: "かしこさのたね",
	19: "こだいのたね",
	20: "竜のウロコ",
	21: "旅路の時計",
	22: "賢者の石",
	23: "白竜の羽",
	24: "鳳凰の羽",
	25: "精霊の涙",
	26: "叡智の指輪",
	27: "叡智のお守り",
	28: "叡智の石",
	29: "叡智の剣",
	30: "叡智の書",
};

// カスタムアイテム画像のファイル名定義
// public/images/items-page/acquired-icon/ 配下のファイル名
// 存在しない場合は undefined または null
export const customItemImages: { [key: number]: string } = {
	1: "medicinal_herbs_icon.png", // やくそう
	2: "meat_icon.png", // 骨付きにく
	3: "mysterious_fruit_icon.png", // 不思議なきのみ
	4: "fruit_of_the_sun_icon.png", // 太陽の果実
	5: "fruit_of_the_moon_icon.png", // 月の果実
	6: "ore_icon.png", // 鉱石
	7: "gold_ore_icon.png", // 金の鉱石
	8: "platinum_ore_icon.png", // プラチナの鉱石
	9: "diamond_ore_icon.png", // ダイヤの鉱石
	10: "star_fragment_icon.png", // ほしのかけら
	11: "book_of_learning_icon.png", // 学びの書
	12: "adventure_log_icon.png", // 冒険の書
	13: "seed_of_strength_icon.png", // ちからのたね
	14: "seed_of_protection_icon.png", // まもりのたね
	15: "seed_of_speed_icon.png", // すばやさのたね
	16: "seed_of_life_icon.png", // いのちのたね
	17: "seed_of_sound_icon.png", // おとのたね
	18: "seed_of_wisdom_icon.png", // かしこさのたね
	19: "seed_of_ancients_icon.png", // こだいのたね
	20: "dragon_scales_icon.png", // 竜のウロコ
	21: "journey_clock_icon.png", // 旅路の時計
	22: "philosophers_stone_icon.png", // 賢者の石
	23: "white_dragon _feather_icon.png", //白竜の羽
	24: "phoenix_feather_icon.png", // 鳳凰の羽
	25: "spirit_tear_icon.png", // 精霊の涙
	26: "wisdom_ring_icon.png", // 叡智の指輪
	27: "wisdom_omamori_icon.png", // 叡智のお守り
	28: "stone_of_wisdom.png", // 叡智の石
	29: "sword_of_wisdom_icon.png", // 叡智の剣
	30: "tome_of_wisdom_icon.png", // 叡智の書
};

// カスタムアイテム説明文の定義
export const customItemDescriptions: { [key: number]: string } = {
	1: "学習で疲れた体力を回復させるための薬草。基本的な疲れはこれで癒せる。",
	2: "空腹を満たす骨付き肉。焼くとさらに美味しくなり、やる気がみなぎる。",
	3: "不思議な力が宿る木の実。食べるとどんな味がするのかは謎に包まれている。",
	4: "太陽の光を浴びて育った果実。一口かじれば、燃えるような情熱が湧いてくる。",
	5: "月の光を浴びて育った果実。心を落ち着かせ、静寂の中で集中力を高める。",
	6: "地下深くで何千年もかけて形成された希少な鉄鉱石。道具を作るための基本素材。",
	7: "山岳地帯の深部にのみ存在する、神秘的な輝きを放つ金の原石。非常に価値が高い。",
	8: "宝石の中でも特に希少な白金。非常に硬く、錆びることがない。",
	9: "世界で最も硬いと言われるダイヤの原石。その輝きは永遠に失われない。",
	10: "夜空から降ってきた美しく輝くかけら。願い事を叶える力があると言われている。",
	11: "世界の知識が記された書物。読むことで新たな知見を得ることができる。",
	12: "これまでの冒険の記録が記された書。過去の自分を振り返ることで成長できる。",
	13: "力が湧いてくる不思議な種。困難な課題に立ち向かうパワーが得られる。使ったらなくなる。",
	14: "飲むと守りが固くなる不思議な種。批判やプレッシャーに強くなる。使ったらなくなる。",
	15: "飲むと素早くなる不思議な種。作業スピードが向上する。使ったらなくなる。",
	16: "体力が増える不思議な種。長期的な学習に耐えうる体力を授かる。使ったらなくなる。",
	17: "絶対音感を授かり音楽の才能に目覚める不思議な種。使ったらなくなる。",
	18: "精神力が増える不思議な種。より深い思考が可能になる。使ったらなくなる。",
	19: "古代の記憶が封じられた不思議な種。古びた技術や知識を呼び覚ますかもしれない。使ったらなくなる。",
	20: "伝説の古竜から剥がれ落ちたウロコ。あらゆる災厄を退ける力がある。",
	21: "古代の旅人が愛用していた懐中時計。進むべき道に迷った時、針が未来を指し示すと言われている。",
	22: "あらゆる物質を黄金に変えると言われる幻の石。無限の可能性を秘めている。",
	23: "空高く舞う白竜の羽。持っているだけで、どこまでも自由に飛べそうな気がする。",
	24: "炎をまとった伝説の鳥の羽。不屈の精神と再生の力を与えてくれる。",
	25: "精霊の力が結晶化した涙。純粋な心を持つ者にしか見えない。",
	26: "叡智の勇者が身につけていた指輪。指にはめると、底知れぬ知恵が湧いてくる。",
	27: "叡智の勇者が身につけていたお守り。いかなる時も冷静さを失わず、最善の選択へと導いてくれる。",
	28: "叡智の勇者が持っていた珍しい石。批判やプレッシャーに強くなり、メンタルが最強になる。",
	29: "叡智の勇者が使用していた伝説の剣。目的や夢を達成するために不要な誘惑を全て断ち切る。",
	30: "目的や夢を達成したものに与えられる伝説の書物。",
};

// レベルに応じて入手できるアイテムかどうかを判定する関数
export const isAcquiredByHeroLevel = (itemId: number, heroLevel: number): boolean => {
	// そのアイテムIDに必要なレベルが設定されているか確認
	const requiredLevel = heroLevelAndItemRelation[itemId];

	// 設定されていない場合、または勇者のレベルが必要レベルに達していない場合はfalse
	if (requiredLevel === undefined || heroLevel < requiredLevel) {
		return false;
	}

	return true;
};

// アイテムのモックデータ生成関数
const generateMockItems = (heroLevel: number = 1): Item[] => {
	return Object.keys(customItemNames).map((key) => {
		const id = Number(key);
		const acquired = isAcquiredByHeroLevel(id, heroLevel);
		return {
			id,
			name: acquired ? customItemNames[id] : null,
			description: acquired ? customItemDescriptions[id] : null,
			image: acquired ? customItemImages[id] : null,
			acquired,
			type: customItemType[id] || "item",
		};
	});
};

// 初期状態では仮のレベル1としてアイテムを生成
const initialItems = generateMockItems(1);

// エクスポートするモックデータ
export const itemsData: ItemsData = {
	items: initialItems,
};

// レベルに応じてアイテムデータを更新する関数
export const updateItemsByLevel = (level: number): Item[] => {
	return generateMockItems(level);
};
