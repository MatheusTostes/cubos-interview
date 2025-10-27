/*
  Warnings:

  - You are about to drop the `movie_languages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `languageId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movie_languages" DROP CONSTRAINT "movie_languages_languageId_fkey";

-- DropForeignKey
ALTER TABLE "movie_languages" DROP CONSTRAINT "movie_languages_movieId_fkey";

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "languageId" TEXT NOT NULL;

-- DropTable
DROP TABLE "movie_languages";

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
