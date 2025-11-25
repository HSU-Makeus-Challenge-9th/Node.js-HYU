-- CreateTable
CREATE TABLE `account` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `birthdate` DATETIME(0) NOT NULL,
    `address` VARCHAR(255) NULL,
    `point` INTEGER NULL,
    `is_activated` BOOLEAN NOT NULL DEFAULT true,
    `inactive_date` DATETIME(0) NULL,
    `phone` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NULL,
    `user_type` ENUM('customer', 'owner') NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `is_phone_verified` BOOLEAN NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_list` (
    `food_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_preference` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `food_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,

    INDEX `fk_food_preference_to_account`(`user_id`),
    INDEX `fk_food_preference_to_food_list`(`food_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry` (
    `inquiry_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `inquiry_type` ENUM('ACCOUNT', 'SERVICE', 'ERROR', 'OTHER') NOT NULL,

    INDEX `fk_inquiry_to_account`(`user_id`),
    PRIMARY KEY (`inquiry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry_photo` (
    `inquiry_photo_id` BIGINT NOT NULL AUTO_INCREMENT,
    `inquiry_id` BIGINT NOT NULL,
    `photo_url` VARCHAR(255) NULL,

    INDEX `fk_inquiry_photo_to_inquiry`(`inquiry_id`),
    PRIMARY KEY (`inquiry_photo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `cost_standard` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,

    PRIMARY KEY (`mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `notification_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `type` ENUM('EVENT', 'REVIEW_REPLY', 'INQUIRY_REPLY', 'ETC') NOT NULL,
    `content` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `is_read` BOOLEAN NOT NULL DEFAULT false,

    INDEX `fk_notification_to_account`(`user_id`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_agreement` (
    `notification_options_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `event` BOOLEAN NOT NULL DEFAULT false,
    `review_reply` BOOLEAN NOT NULL DEFAULT false,
    `inquiry_reply` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `uk_user_id`(`user_id`),
    PRIMARY KEY (`notification_options_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `review_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `store_id` BIGINT NOT NULL,
    `content` TEXT NULL,
    `score` DECIMAL(2, 1) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `fk_review_to_account`(`user_id`),
    INDEX `fk_review_to_store`(`store_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_photo` (
    `review_photo_id` BIGINT NOT NULL,
    `review_id` BIGINT NOT NULL,
    `photo_url` VARCHAR(255) NULL,

    INDEX `fk_review_photo_to_review`(`review_id`),
    PRIMARY KEY (`review_photo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_reply` (
    `review_reply_id` BIGINT NOT NULL AUTO_INCREMENT,
    `review_id` BIGINT NOT NULL,
    `user_id` BIGINT NULL,
    `written_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `fk_review_reply_to_account`(`user_id`),
    INDEX `fk_review_reply_to_review`(`review_id`),
    PRIMARY KEY (`review_reply_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_agreement` (
    `service_agreement_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `using_service` BOOLEAN NOT NULL DEFAULT false,
    `personal_data` BOOLEAN NOT NULL DEFAULT false,
    `location` BOOLEAN NOT NULL DEFAULT false,
    `marketing` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `over_fourteen` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `uk_user_id`(`user_id`),
    PRIMARY KEY (`service_agreement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `store_id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_name` VARCHAR(100) NOT NULL,
    `store_address` VARCHAR(255) NULL,
    `store_type` ENUM('KOREAN', 'CHINESE', 'JAPANESE', 'WESTERN', 'CHICKEN', 'SNACK', 'GRILL', 'LUNCH_BOX', 'LATE_NIGHT', 'FAST_FOOD', 'DESSERT', 'ASIAN') NULL,
    `store_score` DECIMAL(2, 1) NULL DEFAULT 0.0,
    `is_opened` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `challenge_mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `store_id` BIGINT NOT NULL,
    `status` ENUM('IN_PROGRESS', 'COMPLETED') NULL DEFAULT 'IN_PROGRESS',
    `challenge_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `completed_at` DATETIME(6) NULL,
    `limited_at` DATETIME(6) NULL,
    `success_id` VARCHAR(100) NULL,

    INDEX `fk_user_mission_mission`(`mission_id`),
    INDEX `fk_user_mission_store`(`store_id`),
    INDEX `fk_user_mission_user`(`user_id`),
    PRIMARY KEY (`challenge_mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `food_preference` ADD CONSTRAINT `fk_food_preference_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `food_preference` ADD CONSTRAINT `fk_food_preference_to_food_list` FOREIGN KEY (`food_id`) REFERENCES `food_list`(`food_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inquiry` ADD CONSTRAINT `fk_inquiry_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inquiry_photo` ADD CONSTRAINT `fk_inquiry_photo_to_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`(`inquiry_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `fk_notification_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification_agreement` ADD CONSTRAINT `fk_notification_agreement_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `fk_review_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `fk_review_to_store` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_photo` ADD CONSTRAINT `fk_review_photo_to_review` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_reply` ADD CONSTRAINT `fk_review_reply_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_reply` ADD CONSTRAINT `fk_review_reply_to_review` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `service_agreement` ADD CONSTRAINT `fk_service_agreement_to_account` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `fk_user_mission_mission` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`mission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `fk_user_mission_store` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `fk_user_mission_user` FOREIGN KEY (`user_id`) REFERENCES `account`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
