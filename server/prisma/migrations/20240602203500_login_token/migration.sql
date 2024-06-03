/*
  Warnings:

  - Added the required column `login_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `login_token` VARCHAR(191) NOT NULL;
