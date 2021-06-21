-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.19-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for onemorelight
DROP DATABASE IF EXISTS `onemorelight`;
CREATE DATABASE IF NOT EXISTS `onemorelight` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `onemorelight`;

-- Dumping structure for table onemorelight.options
DROP TABLE IF EXISTS `options`;
CREATE TABLE IF NOT EXISTS `options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` bigint(20) unsigned NOT NULL,
  `option_text` varchar(2000) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`option_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table onemorelight.options: ~0 rows (approximately)
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;

-- Dumping structure for table onemorelight.questions
DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `skill_id` bigint(20) unsigned NOT NULL,
  `question_text` varchar(2000) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`question_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `skill_id` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table onemorelight.questions: ~0 rows (approximately)
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;

-- Dumping structure for table onemorelight.skills
DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `skill_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(1000) DEFAULT NULL,
  `skill_content` varchar(2000) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table onemorelight.skills: ~0 rows (approximately)
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;

-- Dumping structure for table onemorelight.topics
DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `topic_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(500) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table onemorelight.topics: ~8 rows (approximately)
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` (`topic_id`, `topic_name`, `is_active`) VALUES
	(1, 'Depression', 1),
	(2, 'anxiety', 1),
	(3, 'financial stress', 1),
	(4, 'family stress', 1),
	(5, 'sexual wellness', 1),
	(6, 'alcohol abuse', 1),
	(7, 'substance abuse', 1),
	(8, 'bipolar disorder', 1);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;

-- Dumping structure for table onemorelight.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `about_me` text DEFAULT NULL,
  `profile_photo` varchar(500) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  `creation_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table onemorelight.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userId`, `name`, `dob`, `gender`, `about_me`, `profile_photo`, `is_active`, `creation_dt`) VALUES
	(1, 'Shivam Pandey', '1990-04-17', 'Male', 'About Me', NULL, 1, '2021-06-20 21:51:31'),
	(2, 'Shivam Pandey_1', '1996-05-12', 'Male', 'Hello Shivam Pandey', 'hello', 1, NULL),
	(3, 'Shivam Pandey_2', '1991-04-01', 'Male', 'Hello Shivam Pandey', 'hello', 1, '2021-06-20 21:59:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table onemorelight.user_topic
DROP TABLE IF EXISTS `user_topic`;
CREATE TABLE IF NOT EXISTS `user_topic` (
  `user_topic_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `topic_id` bigint(20) unsigned NOT NULL,
  `is_active` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `creation_dt` datetime DEFAULT NULL,
  `updation_dt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table onemorelight.user_topic: ~10 rows (approximately)
/*!40000 ALTER TABLE `user_topic` DISABLE KEYS */;
INSERT INTO `user_topic` (`user_topic_id`, `user_id`, `topic_id`, `is_active`, `creation_dt`, `updation_dt`) VALUES
	(1, 1, 1, 1, '2021-06-20 23:47:15', NULL),
	(2, 1, 2, 1, '2021-06-20 23:47:15', NULL),
	(3, 1, 3, 1, '2021-06-20 23:47:15', NULL),
	(4, 2, 2, 1, '2021-06-21 00:04:40', NULL),
	(5, 2, 3, 1, '2021-06-21 00:04:40', NULL),
	(6, 2, 6, 1, '2021-06-21 00:04:40', NULL),
	(7, 3, 2, 1, '2021-06-21 00:04:56', '2021-06-21 00:05:58'),
	(8, 3, 8, 1, '2021-06-21 00:04:56', NULL),
	(9, 3, 6, 1, '2021-06-21 00:04:56', NULL),
	(10, 1, 6, 1, '2021-06-21 00:27:34', '2021-06-21 00:27:34');
/*!40000 ALTER TABLE `user_topic` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
