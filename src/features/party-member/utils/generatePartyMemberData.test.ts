import { describe, it, expect, vi } from "vitest";

// Decouple from the real static data so assertions test the rarity/fallback
// logic only (rarityType is a pure function of partyId).
vi.mock("@/features/party/data/partyMemberData", () => ({
	partyMemberData: {
		partyMembers: [{ id: 1, name: "スライム", description: "やわらかい" }],
	},
}));

import { generatePartyMemberData } from "./generatePartyMemberData";

const rc = { normal: "N", rare: "R", superRare: "SR" };

describe("generatePartyMemberData", () => {
	it("returns null when not acquired", () => {
		expect(generatePartyMemberData(1, false, rc)).toBeNull();
	});

	it("uses data name/description when the id exists", () => {
		const result = generatePartyMemberData(1, true, rc);
		expect(result?.name).toBe("スライム");
		expect(result?.description).toBe("やわらかい");
	});

	it("falls back to a default name for an unknown id", () => {
		expect(generatePartyMemberData(99, true, rc)?.name).toBe("パーティメンバー99");
	});

	it.each([
		[6, "normal"],
		[7, "rare"],
		[10, "rare"],
		[11, "superRare"],
		[20, "superRare"],
	] as const)("assigns rarityType for partyId %i -> %s", (partyId, expected) => {
		expect(generatePartyMemberData(partyId, true, rc)?.rarityType).toBe(expected);
	});

	it("maps the rarity component to the matching tier", () => {
		expect(generatePartyMemberData(11, true, rc)?.rarity).toBe("SR");
		expect(generatePartyMemberData(7, true, rc)?.rarity).toBe("R");
		expect(generatePartyMemberData(1, true, rc)?.rarity).toBe("N");
	});
});
