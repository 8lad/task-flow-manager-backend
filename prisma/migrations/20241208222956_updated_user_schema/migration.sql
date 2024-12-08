/*
  Warnings:

  - You are about to drop the column `avatar` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `auth0Id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `avatar`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `auth0Id`,
    ADD COLUMN `avatar` VARCHAR(191) NOT NULL DEFAULT '';
