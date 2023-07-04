/*
  Warnings:

  - The primary key for the `pops` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pops" (
    "pop_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);
INSERT INTO "new_pops" ("name", "pop_id") SELECT "name", "pop_id" FROM "pops";
DROP TABLE "pops";
ALTER TABLE "new_pops" RENAME TO "pops";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
