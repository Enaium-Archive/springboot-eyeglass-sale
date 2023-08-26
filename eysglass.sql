-- MariaDB dump 10.19-11.0.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: eyeglass
-- ------------------------------------------------------
-- Server version	11.0.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `created_time` timestamp NOT NULL,
  `modified_time` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_pk` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES
(8,'近视','2023-08-26 13:47:00','2023-08-26 13:47:07'),
(9,'123','2023-08-26 13:48:29','2023-08-26 13:48:29');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commodity`
--

DROP TABLE IF EXISTS `commodity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commodity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `image_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `minimum_prescription` int(11) NOT NULL,
  `maximum_prescription` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `view` int(11) NOT NULL DEFAULT 0,
  `created_time` timestamp NOT NULL,
  `modified_time` timestamp NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commodity_image_id_fk` (`image_id`),
  KEY `commodity_category_id_fk` (`category_id`),
  CONSTRAINT `commodity_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `commodity_image_id_fk` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commodity`
--

LOCK TABLES `commodity` WRITE;
/*!40000 ALTER TABLE `commodity` DISABLE KEYS */;
INSERT INTO `commodity` VALUES
(1,'堡莱斯眉线半框近视眼镜',1,12311.00,0,400,'堡莱斯眉线半框近视眼镜男防蓝光辐射变色眼镜可配镜有度数近视眼睛片女 透灰银-时尚眉线 配1.56防蓝光镜片',294,'2023-08-25 09:07:15','2023-08-26 13:47:07',8);
/*!40000 ALTER TABLE `commodity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash32` varchar(32) NOT NULL,
  `created_time` timestamp NOT NULL,
  `modified_time` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES
(1,'c4737a49a1b3be47104fea5a88d17559','2023-08-25 08:40:21','2023-08-25 08:40:21');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `gender` enum('female','male') DEFAULT NULL,
  `role` enum('admin','normal') NOT NULL DEFAULT 'normal',
  `created_time` timestamp NOT NULL,
  `modified_time` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_pk` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES
(1,'123','123','123','male','admin','2023-08-24 09:08:08','2023-08-26 14:09:55'),
(2,'1','1',NULL,NULL,'normal','2023-08-26 14:10:06','2023-08-26 14:10:06');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `commodity_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_time` timestamp NOT NULL,
  `modified_time` timestamp NOT NULL,
  `prescription` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_member_id_fk` (`member_id`),
  KEY `order_commodity_id_fk` (`commodity_id`),
  CONSTRAINT `order_commodity_id_fk` FOREIGN KEY (`commodity_id`) REFERENCES `commodity` (`id`),
  CONSTRAINT `order_member_id_fk` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES
(11,1,1,10,'2023-08-26 06:23:20','2023-08-26 06:23:20',123),
(12,1,1,10,'2023-08-26 06:23:30','2023-08-26 06:23:30',123),
(13,1,1,10,'2023-08-26 06:23:35','2023-08-26 06:23:35',123),
(14,1,1,1,'2023-08-26 06:23:42','2023-08-26 06:23:42',123),
(15,1,1,1,'2023-08-26 06:23:43','2023-08-26 06:23:43',123),
(16,1,1,1,'2023-08-26 06:23:44','2023-08-26 06:23:44',123),
(17,1,1,1,'2023-08-26 06:23:45','2023-08-26 06:23:45',123),
(18,1,1,1,'2023-08-26 06:23:45','2023-08-26 06:23:45',123),
(19,1,1,1,'2023-08-26 06:24:03','2023-08-26 06:24:03',1),
(20,1,1,10,'2023-08-26 06:25:21','2023-08-26 06:25:21',123),
(21,1,1,10,'2023-08-26 06:25:22','2023-08-26 06:25:22',123),
(22,1,1,10,'2023-08-26 09:59:53','2023-08-26 09:59:53',123),
(23,1,1,10,'2023-08-26 09:59:53','2023-08-26 09:59:53',123),
(24,2,1,1,'2023-08-26 14:12:41','2023-08-26 14:12:41',1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-26 22:16:21
