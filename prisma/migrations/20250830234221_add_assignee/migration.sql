-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "url" TEXT,
    "files" JSONB,
    "subjectPerson" TEXT,
    "newsroomContact" TEXT,
    "officialEmail" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journalistEmail" TEXT,
    "journalistId" TEXT,
    "assigneeId" TEXT,
    CONSTRAINT "Article_journalistId_fkey" FOREIGN KEY ("journalistId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Article_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("body", "createdAt", "files", "id", "journalistEmail", "journalistId", "newsroomContact", "officialEmail", "priority", "status", "subjectPerson", "title", "url") SELECT "body", "createdAt", "files", "id", "journalistEmail", "journalistId", "newsroomContact", "officialEmail", "priority", "status", "subjectPerson", "title", "url" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE INDEX "Article_status_idx" ON "Article"("status");
CREATE INDEX "Article_priority_idx" ON "Article"("priority");
CREATE INDEX "Article_assigneeId_idx" ON "Article"("assigneeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
