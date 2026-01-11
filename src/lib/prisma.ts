import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
	pool: Pool | undefined;
};

const prismaClientSingleton = () => {
	// Vercelのサーバーレス環境でのコネクション管理を改善
	// グローバルなPoolを再利用することで、Connection closedエラーを防ぐ
	if (!globalForPrisma.pool) {
		globalForPrisma.pool = new Pool({
			connectionString: process.env.DATABASE_URL,
			// サーバーレス環境向けの設定
			max: 10, // 最大接続数
			idleTimeoutMillis: 30000, // アイドル接続のタイムアウト
			connectionTimeoutMillis: 10000, // 接続タイムアウト
		});
	}

	const adapter = new PrismaPg(globalForPrisma.pool);
	return new PrismaClient({
		adapter,
		log: ["warn", "error"],
	});
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// 開発環境・本番環境ともにグローバル変数を使用
// サーバーレス環境でのコネクション再利用を可能にする
globalForPrisma.prisma = prisma;

export default prisma;
