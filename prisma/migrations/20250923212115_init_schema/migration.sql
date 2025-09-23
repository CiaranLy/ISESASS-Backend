-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `posterId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `semester` ENUM('autumn', 'spring', 'summer') NOT NULL,
    `bed` ENUM('single', 'double') NOT NULL,
    `bathroom` ENUM('shared', 'personal') NOT NULL,
    `ensuite` BOOLEAN NOT NULL DEFAULT false,
    `roommates` INTEGER NOT NULL,
    `notes` TEXT NOT NULL,
    `locationId` INTEGER NOT NULL,

    UNIQUE INDEX `Posts_locationId_key`(`locationId`),
    INDEX `Posts_posterId_idx`(`posterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `line_1` VARCHAR(191) NOT NULL,
    `line_2` VARCHAR(191) NULL,
    `town` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,
    `eircode` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
