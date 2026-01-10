-- DropIndex
DROP INDEX "User_clerkId_idx";

-- DropIndex
DROP INDEX "User_username_idx";

-- CreateTable
CREATE TABLE "AdventureLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdventureLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdventureLog_userId_idx" ON "AdventureLog"("userId");

-- CreateIndex
CREATE INDEX "AdventureLog_occurredAt_idx" ON "AdventureLog"("occurredAt");

-- AddForeignKey
ALTER TABLE "AdventureLog" ADD CONSTRAINT "AdventureLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
