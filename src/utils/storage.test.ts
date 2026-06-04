// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from "vitest";
import { getItem, setItem, removeItem, getJSON, setJSON } from "./storage";

beforeEach(() => {
	localStorage.clear();
	sessionStorage.clear();
});

describe("storage string API", () => {
	it("setItem then getItem round-trips a value", () => {
		expect(setItem("k", "v")).toBe(true);
		expect(getItem("k")).toBe("v");
	});

	it("getItem returns null for a missing key", () => {
		expect(getItem("missing")).toBeNull();
	});

	it("removeItem deletes a value", () => {
		setItem("k", "v");
		expect(removeItem("k")).toBe(true);
		expect(getItem("k")).toBeNull();
	});

	it("scopes by storage type (session vs local)", () => {
		expect(setItem("s", "1", "session")).toBe(true);
		expect(getItem("s", "session")).toBe("1");
		expect(getItem("s", "local")).toBeNull();
	});
});

describe("storage JSON API", () => {
	it("setJSON then getJSON round-trips an object", () => {
		setJSON("obj", { a: 1, b: ["x"] });
		expect(getJSON<{ a: number; b: string[] }>("obj")).toEqual({ a: 1, b: ["x"] });
	});

	it("getJSON returns null on invalid JSON", () => {
		setItem("bad", "{not json");
		expect(getJSON("bad")).toBeNull();
	});

	it("getJSON returns null for a missing key", () => {
		expect(getJSON("nope")).toBeNull();
	});
});
