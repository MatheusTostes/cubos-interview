/*
  Warnings:

  - You are about to drop the `ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_movieId_fkey";

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "aggregateRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "voteCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ratings";
