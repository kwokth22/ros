CREATE DATABASE  IF NOT EXISTS `cfood_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cfood_db`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: cfood_db
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `ImageSrc` varchar(512) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `foodtype` int(11) DEFAULT NULL,
  `restaurantname` varchar(300) DEFAULT NULL,
  `ratednum` int(11) DEFAULT '0',
  `averagerating` float DEFAULT '0',
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='hello world';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Spicy beef tendon noodles','Spicy as hell, it cannot eat anymore. Water or milk plz!!!!!!!!!','../img/Spicy1.jpg',NULL,NULL,1,'Wo Sing Canteen',16,4),(2,'Hot Fried Chicken Ramen','LOL, I cannot eat again. The hottest ramen ever. If you love spicy food, you must like this ramen','../img/Spicy2.jpg',NULL,NULL,1,'759',12,3.5833),(3,'Spicy boiled beef with rice','Easy, not so spicy then TamJi SamGor mixian.','../img/Spicy3.jpg',NULL,NULL,2,'coffee con',5,3.4),(4,'Fantasy Taste in CUHK','Discover the most fantastic restaurant in CUHK.','../img/franklin.jpg',NULL,NULL,3,'franklin',5,5),(5,'Heavy Taste','Cheese!Cheese!Cheeses everywhere!','../img/Chesse1.jpg',NULL,NULL,5,'kimochi',1,3),(6,'Taste','Tasty Road, Let\\\'s eat it','../img/hotdog.jpg',NULL,NULL,1,NULL,1,3),(16,'Watermelon Face','Look into the hollow eyes of the Watermelon Man while you consume his flesh. :)','../uploads/foodpic/1460546781510.jpg',NULL,NULL,1,'Watermelon Specialist Restaurant',0,0),(17,'Poop Curry','Have you been asked about the question \"if you have to eat one, which one would you choose: poop flavoured curry or curry flavoured poop?\"\r\nNow this has become a reality! ... At least for one of them.\r\nOriginal flavour recreated! No actual poop involved! Safe to eat!\r\nTest your limit as a human and try out the Poop Curry!','../uploads/foodpic/1460546806016.jpg',NULL,NULL,3,'Curry Shop',1,5),(18,'The Random Dish','\"Hardly to be tasty\" or \"Too F-ing tasty\"? I leave it for you to try it out!','../uploads/foodpic/1460547299248.jpg',NULL,NULL,5,'Ho Lun Ho Sik Restaurant',1,4),(19,'Salmon','Fusion','../uploads/foodpic/1460556530313.jpg',22.418307593709045,114.20733540364293,5,'Sin heng',2,4.5),(20,'Red Bean Sushi','Hell\'s Gate opens for you.','../uploads/foodpic/1460613623595.jpg',NULL,NULL,1,'Ming General Japanese Sushi Restaurant',0,0),(21,'Thousand Burger','Burger with layers of meat patties. World record breaking burger calls for world record breaking fast eaters!','../uploads/foodpic/1460613951321.jpg',NULL,NULL,5,'McD',1,5),(22,'Hi-potion','The healing potion only existed in the Final Fantasy game has come to reality. Combining the power of over 30 different kinds of energy drinks, the Hi-potion can definitely fully replenish your health... if you can bear that taste.','../uploads/foodpic/1460614595495.jpg',NULL,NULL,3,'Rainbow Horse Cafe',4,4),(23,'McBlend','The combination of all McD products in one pot (blender?) . A must try if you are a McD die hard fan!','../uploads/foodpic/1460615311277.jpg',NULL,NULL,1,'Rainbow Horse Cafe',5,2.8),(24,'Boss Bacon Burger','Boss Bacon Burger made specifically for MuscleGlasses. Wow so boss very bacon.','../uploads/foodpic/1460615560927.jpg',NULL,NULL,5,'EMT',5,4.2),(25,'spag','tys','../uploads/foodpic/1460632684117.jpg',22.418067699999998,114.2072932,3,'cuhk',0,0);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `postID` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `ItemID` int(11) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`postID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,25,1,'U jump i jump','2016-04-13 02:21:11'),(2,25,1,'正','2016-04-13 02:24:37'),(3,28,1,'im tester','2016-04-13 02:37:54'),(4,25,2,'yu','2016-04-13 03:45:45'),(5,29,1,'FK JS','2016-04-13 08:27:14'),(6,29,2,'good job','2016-04-13 08:27:30'),(7,25,4,'eat sleep shit recycle','2016-04-13 09:15:45'),(8,30,1,'I am tutor','2016-04-13 09:19:12'),(9,27,1,'nice boat','2016-04-13 15:54:53'),(10,26,8,'yup','2016-04-13 17:01:00'),(11,33,16,'Creepy :)','2016-04-13 20:54:28'),(12,34,1,'gd','2016-04-14 12:48:40'),(13,26,2,'Very Spicy','2016-04-14 16:30:37'),(14,33,24,'It is bossy, huge and tasty.','2016-04-14 16:32:31'),(15,33,17,'Holy sh!t no way I am eating that','2016-04-14 16:33:22'),(16,33,16,'Perfect. Hands down.','2016-04-14 16:34:09'),(17,33,21,'Hmm... I don\'t know whether I should choose between this or the Boss Bacon Burger... but WHY NOT BOTH?','2016-04-14 16:37:59'),(18,27,20,'No. No. NO. NO. NO NO NO.','2016-04-14 16:44:08'),(19,27,23,'Maybe I should try this after Sushi Blend :)','2016-04-14 16:47:24'),(20,27,22,'The healing effect is superb!','2016-04-14 16:47:54'),(21,27,17,'I am no simple human so it is perfectly fine for me :P','2016-04-14 16:48:47'),(22,33,2,'Not spicy at all. FAIL.','2016-04-14 16:50:34'),(23,33,1,'Testes great but not spicy enough.','2016-04-14 16:51:10'),(24,33,5,'CHEEEEEEEEEEEEEESE','2016-04-14 16:53:36'),(25,33,18,'Fun to eat every single time','2016-04-14 16:54:06'),(26,33,19,'I can feel the (nuclear) fusion inside me!!!','2016-04-14 16:55:19'),(27,33,20,'That is what would come out after you put it in your mouth. Either from the upper or the lower opening :(','2016-04-14 18:09:17'),(28,33,6,'Normal stuff, nothing exciting.','2016-04-14 18:09:43'),(29,27,19,'Horse does\'t eat fish. Human doesn\'t eat crap.','2016-04-14 18:10:53'),(30,27,24,'That burger has horse meat. No way I am being cannibal.','2016-04-14 18:19:01'),(31,27,18,'Perfect for me.','2016-04-14 18:19:19'),(32,38,19,'Good luck have fun','2016-04-14 18:46:30'),(33,39,1,'good comment','2016-04-14 19:15:01');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pw` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (27,'hihi','fk','hihi','../uploads/user/1460623576106.jpg'),(28,'tester','test','testerkin','../img/default.jpg'),(29,'BB Pig','123','Pig Pig','../uploads/user/1460507117672.jpg'),(31,'asd','asd','asd','../img/default.jpg'),(33,'zuizui','12','kakagaga','../uploads/user/1460551980444.jpg'),(34,'Kwokth','1234','Kwok','../uploads/user/1460556420748.jpg'),(35,'kwok','123','kwok','../img/default.jpg'),(36,'iphone','123','iphone','../img/default.jpg'),(37,'hkson','123','hkson','../img/default.jpg'),(38,'watermelon1995','1234','watermelon1995','../uploads/user/1460627997698.jpg'),(39,'csci3100','123','csci','../uploads/user/1460632461462.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-20 21:11:12
