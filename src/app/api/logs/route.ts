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

		return NextResponse.json({ success: true, logs });
	} catch (error) {
		console.error("Fetch logs error:", error);
		return NextResponse.json({ success: false, error: "Failed to fetch logs" }, { status: 500 });
	}
}
