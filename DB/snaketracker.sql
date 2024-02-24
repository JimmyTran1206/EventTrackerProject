-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema snaketrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `snaketrackerdb` ;

-- -----------------------------------------------------
-- Schema snaketrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `snaketrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `snaketrackerdb` ;

-- -----------------------------------------------------
-- Table `snake`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `snake` ;

CREATE TABLE IF NOT EXISTS `snake` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `snake_type` VARCHAR(100) NOT NULL,
  `description` VARCHAR(10000) NULL,
  `picture_url` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS snaketrackeruser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'snaketrackeruser'@'localhost' IDENTIFIED BY 'snaketrackeruser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'snaketrackeruser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `snake`
-- -----------------------------------------------------
START TRANSACTION;
USE `snaketrackerdb`;
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (1, 'King Cobra', 'King cobras are impressively venomous, large snakes native to Asia. They are called king cobras because they can kill and eat cobras. A full-grown king cobra is yellow, green, brown or black, typically with yellow-white crossbars or chevrons.\nA full-grown king cobra is yellow, green, brown or black. They usually also have yellowish or white crossbars or chevrons. The belly may be uniform in color or ornamented with bars. The throat is light yellow or cream-colored. The juveniles are jet-black, with yellow or white crossbars on the body and tail and four similar crossbars on the head. The king cobra is regarded as a fierce and aggressive snake and its length and size give it an awe inspiring appearance.\n\n', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/12_-_The_Mystical_King_Cobra_and_Coffee_Forests.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (2, 'Gophersnake', 'This is the snake I am most often asked to identify.\nIt is very common in most of the state.', 'https://californiaherps.com/snakes/images/pcannectenssb406.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (3, 'Coachwhip (Racer)', 'Common in the desert and southern California coastal region. Sometimes enters suburban yards.\n', 'https://californiaherps.com/snakes/images/mfruddockicp6084.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (4, 'Sharp-tailed Snake', 'Many people find these tiny snakes on their property in Northern California and in the Sierra Nevada foothills,\noften while digging in leaf litter or under rocks or other surface objects.\n', 'https://californiaherps.com/snakes/images/ctenuispl411.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (5, 'California Kingsnake', 'Common throughout the state. Most have bands or rings around the body, but some have stripes.\nThey can be brown or black with white or yellow bands or stripes.', 'https://californiaherps.com/snakes/images/lgcaliforniaepp6062.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (7, 'Western Racer', 'Common throughout most of the state. Very fast moving and mostly solid gray, greenish, or brown in color.\nThe young appear completely different from adults, with a pattern of dark blotches similar to a Gophersnake.\n\n', 'https://californiaherps.com/snakes/images/cmormonyu506.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (8, 'Striped Racer', 'Common throughout most of the state. Long and very fast moving with light stripes on the sides (but not on the back.)\nOften confused with gartersnakes which also have stripes on the sides.\n', 'https://californiaherps.com/snakes/images/mllateraliscl.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (9, 'Ring-necked Snake', 'Common throughout much of the state. Gray with a light ring around the neck.\nBright orange or yellow on the belly and under the end of the tail.\n', 'https://californiaherps.com/snakes/images/dppulchellusvent.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (10, 'Western Rattlesnake', 'Common throughout much of the state, but less common in suburban areas.\nHas a large body with a large triangular head and a blunt tail with a rattle on the end.\nThis snake is often heard before it is seen, but it does not always rattle.', 'https://californiaherps.com/snakes/images/cohellerijuvla506.jpg');
INSERT INTO `snake` (`id`, `snake_type`, `description`, `picture_url`) VALUES (11, 'Gartersnakes', 'Common throughout much of the state.\nThe head is slightly wider than the body. Most species of gartersnake have two or three light stripes,\nbut some have only side stripes and sometimes the stripes are faint.', 'https://californiaherps.com/snakes/images/teterrestris04pesc.jpg');

COMMIT;

