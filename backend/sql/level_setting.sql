
USE `wav_game`;

-- LEVEL SETTINGS
CREATE TABLE `level_setting` (
  `level` INT(11)  NOT NULL,
  `countdown_start_at` DATETIME NULL,
  `countdown_ends` INT(11) NOT NULL DEFAULT(0),
  PRIMARY KEY (`level`)
);

-- level 4 
INSERT INTO `level_setting` (`level`, `countdown_start_at`, `countdown_ends`)
VALUES(4, '2023-07-10 15:00:00', 259200000); -- 3 days

-- level 5
INSERT INTO `level_setting` (`level`, `countdown_start_at`, `countdown_ends`)
VALUES(5, '2023-07-10 15:00:00', 432000000); -- 5 days

-- level 6
INSERT INTO `level_setting` (`level`, `countdown_start_at`, `countdown_ends`)
VALUES(6, '2023-07-10 15:00:00', 604800000); -- 7 days

-- claim amount
ALTER TABLE `level_setting`
ADD COLUMN `claim_amount` INT(11) NOT NULL DEFAULT(0) AFTER `countdown_ends`;

UPDATE `level_setting`
SET `claim_amount` = 20
WHERE `level`  = 4;

UPDATE `level_setting`
SET `claim_amount` = 10
WHERE `level`  = 5;

UPDATE `level_setting`
SET `claim_amount` = 1
WHERE `level`  = 6;
