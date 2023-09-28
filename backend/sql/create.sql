
CREATE DATABASE `wav_game`;

USE `wav_game`;

CREATE USER 'wav_game'@'localhost' IDENTIFIED BY '1q2w3e';

GRANT ALL PRIVILEGES ON wav_game.* TO 'wav_game'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serviceprovider_name` varchar(150) NOT NULL,
  `username` varchar(200) NOT NULL,
  `avatar` LONGBLOB,
  `public_address` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serviceprovider_name_UNIQUE` (`serviceprovider_name`)
);
CREATE TABLE `game` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` ENUM('not_started', 'in_progress', 'main_prize_claimed') NOT NULL DEFAULT 'not_started',
  `user_id` INT(11) NOT NULL,
  `level` INT(11)  DEFAULT 0,
  `artist_name` VARCHAR(200) NOT NULL,
  `level_4_claimed_prizes` INT(11)  DEFAULT 0,
  `level_5_claimed_prizes` INT(11)  DEFAULT 0,
  `level_6_claimed_main_prize` TINYINT(1)  DEFAULT 0,
  `claimable_prize_count` INT(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_game_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

ALTER TABLE `game`
ADD COLUMN `game_symbol_id` INT(11) AFTER `claimable_prize_count`;

ALTER TABLE `game`
ADD COLUMN `created_at` DATETIME NOT NULL DEFAULT (UTC_TIMESTAMP()) AFTER `game_symbol_id`;

ALTER TABLE `user`
ADD COLUMN `created_at` DATETIME NOT NULL DEFAULT (UTC_TIMESTAMP()) AFTER `public_address`;


CREATE TABLE `level_burn_status` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` INT(11) NOT NULL DEFAULT 0,
  `user_address` VARCHAR(200) NOT NULL,
  `level_id` INT(11) NOT NULL,
  `game_id` INT(11) NOT NULL,
  `last_block` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
);

/*13 July 2023, for game ended feedback rating*/
ALTER TABLE `user`
ADD COLUMN `feedback_rating` INT(11)  DEFAULT 0 AFTER `created_at`;
