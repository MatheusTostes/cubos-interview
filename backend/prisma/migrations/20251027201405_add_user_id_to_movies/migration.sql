/*
  Warnings:

  - Added the required column `userId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Add userId column as nullable temporarily
ALTER TABLE "movies" ADD COLUMN "userId" TEXT;

-- Step 2: Set a default userId for existing movies (first user in the system)
UPDATE "movies" SET "userId" = (SELECT id FROM "users" LIMIT 1) WHERE "userId" IS NULL;

-- Step 3: Make userId NOT NULL now that all rows have a value
ALTER TABLE "movies" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
