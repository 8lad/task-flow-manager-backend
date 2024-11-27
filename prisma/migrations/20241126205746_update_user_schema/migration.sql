/*
  Warnings:

  - You are about to drop the column `authProviderId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `auth0Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `authProviderId`,
    DROP COLUMN `password`,
    ADD COLUMN `auth0Id` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'MANAGER', 'MEMBER') NULL;
