/*
  Warnings:

  - You are about to alter the column `phone` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `phone` VARCHAR(100) NOT NULL;
