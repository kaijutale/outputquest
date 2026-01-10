import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
		}

		const logs = await prisma.adventureLog.findMany({
			where: { userId: user.id },
			orderBy: { occurredAt: "desc" },
		});

		// Map to string array for compatibility with current UI expectations if needed?
		// Or return full objects.
		// Current UI expects string[].
		// But new UI might want more details (type, etc).
		// For now, let's return the objects, and the client can format them.

		return NextResponse.json({ success: true, logs });
	} catch (error) {
		console.error("Fetch logs error:", error);
		return NextResponse.json({ success: false, error: "Failed to fetch logs" }, { status: 500 });
	}
}
