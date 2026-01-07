import { ItemsData } from "../types/items.types";
import { itemsData } from "../data/itemsData";

/**
 * アイテムデータを取得する関数
 * アプリケーションの定義データ（ItemsData）を返します
 */
export async function fetchItemsData(): Promise<ItemsData> {
	// TODO: 実際のAPIが実装されたら、ここでフェッチ処理を行う
	// 例:
	// try {
	//   const response = await fetch("/api/items");
	//   if (!response.ok) {
	//     throw new Error("アイテムデータの取得に失敗しました");
	//   }
	//   return await response.json();
	// } catch (error) {
	//   console.error("アイテムデータの取得エラー:", error);
	//   // エラー時にはモックデータを返す
	//   return itemsData;
	// }

	// 定義データを返す
	return Promise.resolve(itemsData);
}
