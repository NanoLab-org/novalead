-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NULL,
    `nom` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `formation` VARCHAR(191) NULL,
    `entreprise` VARCHAR(191) NULL,
    `secteur` VARCHAR(191) NULL,
    `nbPersonnes` VARCHAR(191) NULL,
    `domaine` VARCHAR(191) NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
