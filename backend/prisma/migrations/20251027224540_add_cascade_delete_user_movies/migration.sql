-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_userId_fkey";

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
