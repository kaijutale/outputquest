import { describe, it, expect } from "vitest";
import { formatDate, formatDateShort, formatDateWithTime } from "./formatDate";

// Dates are constructed with local components (new Date(y, mIndex, d, ...)) so
// assertions are timezone-independent: the formatters read local fields.

describe("formatDate", () => {
	it("formats a Date as Japanese long form (year年month月day日)", () => {
		expect(formatDate(new Date(2025, 0, 25))).toBe("2025年1月25日");
		expect(formatDate(new Date(2025, 11, 5))).toBe("2025年12月5日");
	});

	it("accepts an ISO string equivalently to a Date", () => {
		const iso = "2025-06-15T12:00:00";
		expect(formatDate(iso)).toBe(formatDate(new Date(iso)));
	});
});

describe("formatDateShort", () => {
	it("formats as YYYY/M/D without zero padding", () => {
		expect(formatDateShort(new Date(2025, 0, 25))).toBe("2025/1/25");
	});

	it("returns an empty string for undefined", () => {
		expect(formatDateShort(undefined)).toBe("");
	});
});

describe("formatDateWithTime", () => {
	it("zero-pads month/day/time as YYYY/MM/DD HH:mm:ss", () => {
		expect(formatDateWithTime(new Date(2025, 0, 5, 9, 7, 3))).toBe("2025/01/05 09:07:03");
	});
});
