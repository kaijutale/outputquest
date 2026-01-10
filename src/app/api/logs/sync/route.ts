import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { syncAdventureLogs } from "@/features/logs/services/logService";

export async function POST(request: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
		}

		// Find user in DB (we need the DB ID, not Clerk ID for existing check?
		// Actually logService uses userId. Schema says userId is a String referncing User.id.
		// Wait, User model: id (uuid), clerkId (String @unique).
		// logs.userId refers to User.id.
		// So we must fetch User.id via clerkId.

		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
		}

		const body = await request.json();
		const { articles } = body;

		if (!Array.isArray(articles)) {
			return NextResponse.json({ success: false, error: "Invalid articles data" }, { status: 400 });
		}

		await syncAdventureLogs(user.id, articles);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Sync logs error:", error);
		return NextResponse.json({ success: false, error: "Failed to sync logs" }, { status: 500 });
	}
}
