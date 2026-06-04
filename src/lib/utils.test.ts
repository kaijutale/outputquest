import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("merges multiple class names", () => {
		expect(cn("px-2", "py-1")).toBe("px-2 py-1");
	});

	it("resolves conflicting tailwind classes (last wins)", () => {
		expect(cn("px-2", "px-4")).toBe("px-4");
	});

	it("ignores falsy / conditional values", () => {
		expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
	});
});
