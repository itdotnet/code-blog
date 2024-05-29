-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "BlogImage_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BlogImage" ("blogId", "id", "url") SELECT "blogId", "id", "url" FROM "BlogImage";
DROP TABLE "BlogImage";
ALTER TABLE "new_BlogImage" RENAME TO "BlogImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
