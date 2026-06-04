import { describe, it, expect } from "vitest";
import { cleanUsername, isValidZennUsernameFormat } from "./index";

describe("cleanUsername", () => {
	it("strips a single leading @", () => {
		expect(cleanUsername("@kaiju")).toBe("kaiju");
	});

	it("leaves a username without @ unchanged", () => {
		expect(cleanUsername("kaiju")).toBe("kaiju");
	});

	it("only strips the leading @, not internal ones", () => {
		expect(cleanUsername("@ka@iju")).toBe("ka@iju");
	});
});

describe("isValidZennUsernameFormat", () => {
	it.each(["kaiju", "kaiju_123", "user-name", "ABC123", "_", "-"])(
		"accepts valid username: %s",
		(username) => {
			expect(isValidZennUsernameFormat(username)).toBe(true);
		}
	);

	it.each(["", "@kaiju", "kai ju", "かいじゅう", "user.name", "user!", "a/b"])(
		"rejects invalid username: %s",
		(username) => {
			expect(isValidZennUsernameFormat(username)).toBe(false);
		}
	);
});
