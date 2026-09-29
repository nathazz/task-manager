-- DropIndex
DROP INDEX "Task_userId_status_idx";

-- CreateIndex
CREATE INDEX "Task_userId_createdAt_idx" ON "Task"("userId", "createdAt" DESC);
