import { describe, it, expect, vi } from "vitest";

// Decouple from the real static data so assertions test the rarity/fallback
// logic only (rarityType is a pure function of itemId).
vi.mock("@/features/items/data/itemsData", () => ({
	itemsData: {
		items: [{ id: 1, name: "やくそう", description: "HP回復" }],
	},
}));

import { generateItemData } from "./generateItemData";

const rc = { normal: "N", rare: "R", superRare: "SR" };

describe("generateItemData", () => {
	it("returns null when not acquired", () => {
		expect(generateItemData(1, false, rc)).toBeNull();
	});

	it("uses data name/description when the id exists", () => {
		const result = generateItemData(1, true, rc);
		expect(result?.name).toBe("やくそう");
		expect(result?.description).toBe("HP回復");
	});

	it("falls back to a default name for an unknown id", () => {
		expect(generateItemData(999, true, rc)?.name).toBe("アイテム999");
	});

	it.each([
		[12, "normal"],
		[13, "rare"],
		[29, "rare"],
		[30, "superRare"],
		[31, "rare"],
	] as const)("assigns rarityType for itemId %i -> %s", (itemId, expected) => {
		expect(generateItemData(itemId, true, rc)?.rarityType).toBe(expected);
	});
});
