/*
  Warnings:

  - You are about to alter the column `description` on the `idea` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to alter the column `text` on the `idea` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(191)`.

*/

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_nick_key`(`nick`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
