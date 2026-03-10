/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Assignment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dueDate" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CREATE'
);
INSERT INTO "new_Assignment" ("createdAt", "description", "dueDate", "id", "name", "updatedAt") SELECT "createdAt", "description", "dueDate", "id", "name", "updatedAt" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE UNIQUE INDEX "Assignment_name_key" ON "Assignment"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
