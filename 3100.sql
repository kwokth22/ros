-- phpMyAdmin SQL Dump
-- version 4.5.3.1
-- http://www.phpmyadmin.net
--
-- Host: db
-- Generation Time: May 06, 2016 at 09:11 AM
-- Server version: 5.5.49
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cfood_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `ItemID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `ImageSrc` varchar(512) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `foodtype` int(11) DEFAULT NULL,
  `restaurantname` varchar(300) DEFAULT NULL,
  `ratednum` int(11) DEFAULT '0',
  `averagerating` float DEFAULT '0',
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='hello world';

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`ItemID`, `Name`, `Description`, `ImageSrc`, `latitude`, `longitude`, `foodtype`, `restaurantname`, `ratednum`, `averagerating`, `date`) VALUES
(1, 'Spicy beef tendon noodles', 'Spicy as hell, it cannot eat anymore. Water or milk plz!!!!!!!!!', '../img/Spicy1.jpg', NULL, NULL, 1, 'Wo Sing Canteen', 16, 4, NULL),
(2, 'Hot Fried Chicken Ramen', 'LOL, I cannot eat again. The hottest ramen ever. If you love spicy food, you must like this ramen', '../img/Spicy2.jpg', NULL, NULL, 1, '759', 14, 3.6428, NULL),
(3, 'Spicy boiled beef with rice', 'Easy, not so spicy then TamJi SamGor mixian.', '../img/Spicy3.jpg', NULL, NULL, 2, 'coffee con', 5, 3.4, NULL),
(4, 'Fantasy Taste in CUHK', 'Discover the most fantastic restaurant in CUHK.', '../img/franklin.jpg', NULL, NULL, 3, 'franklin', 5, 5, NULL),
(5, 'Heavy Taste', 'Cheese!Cheese!Cheeses everywhere!', '../img/Chesse1.jpg', NULL, NULL, 5, 'kimochi', 1, 3, NULL),
(6, 'Taste', 'Tasty Road, Let\\\'s eat it', '../img/hotdog.jpg', NULL, NULL, 1, NULL, 1, 3, NULL),
(16, 'Watermelon Face', 'Look into the hollow eyes of the Watermelon Man while you consume his flesh. :)', '../uploads/foodpic/1460546781510.jpg', NULL, NULL, 1, 'Watermelon Specialist Restaurant', 0, 0, NULL),
(17, 'Poop Curry', 'Have you been asked about the question "if you have to eat one, which one would you choose: poop flavoured curry or curry flavoured poop?"\r\nNow this has become a reality! ... At least for one of them.\r\nOriginal flavour recreated! No actual poop involved! Safe to eat!\r\nTest your limit as a human and try out the Poop Curry!', '../uploads/foodpic/1460546806016.jpg', NULL, NULL, 3, 'Curry Shop', 1, 5, NULL),
(18, 'The Random Dish', '"Hardly to be tasty" or "Too F-ing tasty"? I leave it for you to try it out!', '../uploads/foodpic/1460547299248.jpg', NULL, NULL, 5, 'Ho Lun Ho Sik Restaurant', 1, 4, NULL),
(19, 'Salmon', 'Fusion', '../uploads/foodpic/1460556530313.jpg', 22.418307593709045, 114.20733540364293, 5, 'Sin heng', 2, 4.5, NULL),
(20, 'Red Bean Sushi', 'Hell\'s Gate opens for you.', '../uploads/foodpic/1460613623595.jpg', NULL, NULL, 1, 'Ming General Japanese Sushi Restaurant', 0, 0, NULL),
(21, 'Thousand Burger', 'Burger with layers of meat patties. World record breaking burger calls for world record breaking fast eaters!', '../uploads/foodpic/1460613951321.jpg', NULL, NULL, 5, 'McD', 1, 5, NULL),
(22, 'Hi-potion', 'The healing potion only existed in the Final Fantasy game has come to reality. Combining the power of over 30 different kinds of energy drinks, the Hi-potion can definitely fully replenish your health... if you can bear that taste.', '../uploads/foodpic/1460614595495.jpg', NULL, NULL, 3, 'Rainbow Horse Cafe', 4, 4, NULL),
(23, 'McBlend', 'The combination of all McD products in one pot (blender?) . A must try if you are a McD die hard fan!', '../uploads/foodpic/1460615311277.jpg', NULL, NULL, 1, 'Rainbow Horse Cafe', 5, 2.8, NULL),
(24, 'Boss Bacon Burger', 'Boss Bacon Burger made specifically for MuscleGlasses. Wow so boss very bacon.', '../uploads/foodpic/1460615560927.jpg', NULL, NULL, 5, 'EMT', 5, 4.2, NULL),
(25, 'asdasd', 'asdasdasdsadasd', '../uploads/foodpic/1462348048359.jpg', NULL, NULL, 2, 'asdasd', 0, 0, NULL),
(26, 'asdasdasdas', 'sdasdasdsad', '../uploads/foodpic/1462348604108.jpg', NULL, NULL, 4, 'sadsadas', 0, 0, '2016-05-04 07:56:44'),
(27, 'tt', 'asd', '../uploads/foodpic/1462373194776.jpg', NULL, NULL, 3, 'tt', 0, 0, '2016-05-04 14:46:35');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postID` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `ItemID` int(11) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postID`, `uid`, `ItemID`, `comment`, `date`) VALUES
(1, 25, 1, 'U jump i jump', '2016-04-13 02:21:11'),
(2, 25, 1, '正', '2016-04-13 02:24:37'),
(3, 28, 1, 'im tester', '2016-04-13 02:37:54'),
(4, 25, 2, 'yu', '2016-04-13 03:45:45'),
(5, 29, 1, 'FK JS', '2016-04-13 08:27:14'),
(6, 29, 2, 'good job', '2016-04-13 08:27:30'),
(7, 25, 4, 'eat sleep shit recycle', '2016-04-13 09:15:45'),
(8, 30, 1, 'I am tutor', '2016-04-13 09:19:12'),
(9, 27, 1, 'nice boat', '2016-04-13 15:54:53'),
(10, 26, 8, 'yup', '2016-04-13 17:01:00'),
(11, 33, 16, 'Creepy :)', '2016-04-13 20:54:28'),
(12, 34, 1, 'gd', '2016-04-14 12:48:40'),
(13, 26, 2, 'Very Spicy', '2016-04-14 16:30:37'),
(14, 33, 24, 'It is bossy, huge and tasty.', '2016-04-14 16:32:31'),
(15, 33, 17, 'Holy sh!t no way I am eating that', '2016-04-14 16:33:22'),
(16, 33, 16, 'Perfect. Hands down.', '2016-04-14 16:34:09'),
(17, 33, 21, 'Hmm... I don\'t know whether I should choose between this or the Boss Bacon Burger... but WHY NOT BOTH?', '2016-04-14 16:37:59'),
(18, 27, 20, 'No. No. NO. NO. NO NO NO.', '2016-04-14 16:44:08'),
(19, 27, 23, 'Maybe I should try this after Sushi Blend :)', '2016-04-14 16:47:24'),
(20, 27, 22, 'The healing effect is superb!', '2016-04-14 16:47:54'),
(21, 27, 17, 'I am no simple human so it is perfectly fine for me :P', '2016-04-14 16:48:47'),
(22, 33, 2, 'Not spicy at all. FAIL.', '2016-04-14 16:50:34'),
(23, 33, 1, 'Testes great but not spicy enough.', '2016-04-14 16:51:10'),
(24, 33, 5, 'CHEEEEEEEEEEEEEESE', '2016-04-14 16:53:36'),
(25, 33, 18, 'Fun to eat every single time', '2016-04-14 16:54:06'),
(26, 33, 19, 'I can feel the (nuclear) fusion inside me!!!', '2016-04-14 16:55:19'),
(27, 33, 20, 'That is what would come out after you put it in your mouth. Either from the upper or the lower opening :(', '2016-04-14 18:09:17'),
(28, 33, 6, 'Normal stuff, nothing exciting.', '2016-04-14 18:09:43'),
(29, 27, 19, 'Horse does\'t eat fish. Human doesn\'t eat crap.', '2016-04-14 18:10:53'),
(30, 27, 24, 'That burger has horse meat. No way I am being cannibal.', '2016-04-14 18:19:01'),
(31, 27, 18, 'Perfect for me.', '2016-04-14 18:19:19'),
(32, 38, 19, 'Good luck have fun', '2016-04-14 18:46:30'),
(33, 39, 1, 'good comment', '2016-04-14 19:15:01'),
(34, 38, 6, 'asd', '2016-04-26 09:27:50'),
(35, 38, 3, 'HI', '2016-05-04 07:01:09'),
(36, 38, 2, 'Good ', '2016-05-04 07:05:44'),
(37, 38, 2, 'asd', '2016-05-04 08:27:48'),
(38, 38, 16, 'asdasd', '2016-05-04 08:27:56');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(5) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pw` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `pw`, `name`, `avatar`) VALUES
(27, 'hihi', 'fk', 'hihi', '../uploads/user/1460623576106.jpg'),
(28, 'tester', 'test', 'testerkin', '../img/default.jpg'),
(29, 'BB Pig', '123', 'Pig Pig', '../uploads/user/1460507117672.jpg'),
(31, 'asd', 'asd', 'asd', '../img/default.jpg'),
(33, 'zuizui', '12', 'kakagaga', '../uploads/user/1460551980444.jpg'),
(34, 'Kwokth', '1234', 'Kwok', '../uploads/user/1460556420748.jpg'),
(35, 'kwok', '123', 'kwok', '../img/default.jpg'),
(36, 'iphone', '123', 'iphone', '../img/default.jpg'),
(37, 'hkson', '123', 'hkson', '../img/default.jpg'),
(38, 'watermelon1995', 'doge', 'watermelon1995', '../uploads/user/1462345253567.jpg'),
(39, 'csci3100', '123', 'csci', '../uploads/user/1460632461462.jpg'),
(40, 'testing', '123', 'tes', '../uploads/user/1462347220624.jpg'),
(41, 'windows', 'win', 'windows', '../uploads/user/1462373312741.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`ItemID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `ItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
