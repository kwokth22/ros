-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 15, 2017 at 08:52 PM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `robot`
--

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE IF NOT EXISTS `queue` (
  `qid` int(5) NOT NULL,
  `uid` int(5) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`qid`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`qid`, `uid`, `datetime`) VALUES
(1, 28, '2017-03-08 07:29:41'),
(2, 42, '2017-03-09 14:13:58'),
(3, 37, '2017-03-09 14:49:53'),
(4, 35, '2017-03-09 14:50:24'),
(5, 43, '2017-03-09 15:14:22'),
(6, 44, '2017-03-15 15:41:29'),
(7, 45, '2017-03-15 16:19:25');

-- --------------------------------------------------------

--
-- Table structure for table `transcation`
--

CREATE TABLE IF NOT EXISTS `transcation` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(5) NOT NULL,
  `receiver` int(5) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `tid` (`tid`),
  KEY `sender` (`sender`,`receiver`),
  KEY `receiver` (`receiver`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=23 ;

--
-- Dumping data for table `transcation`
--

INSERT INTO `transcation` (`tid`, `sender`, `receiver`, `date`) VALUES
(5, 28, 29, '2017-02-28'),
(6, 28, 29, '2017-02-28'),
(7, 28, 29, '2017-02-28'),
(8, 28, 29, '2017-02-28'),
(11, 28, 29, '2017-02-28'),
(12, 28, 29, '2017-02-28'),
(13, 29, 31, '2017-02-28'),
(14, 29, 34, '2017-03-01'),
(15, 35, 34, '2017-03-01'),
(16, 34, 37, '2017-03-01'),
(17, 33, 34, '2017-03-01'),
(18, 29, 33, '2017-03-02'),
(19, 29, 31, '2017-03-02'),
(20, 42, 31, '2017-03-01'),
(21, 42, 31, '2017-03-06'),
(22, 42, 31, '2017-03-09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pw` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=46 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `pw`, `name`, `avatar`) VALUES
(28, 'tester', 'test', 'testerkin', '../img/default.jpg'),
(29, 'BB Pig', '123', 'Pig Pig', '../uploads/user/1460507117672.jpg'),
(31, 'asd', 'asd', 'asd', '../img/default.jpg'),
(33, 'zuizui', '12', 'kakagaga', '../uploads/user/1460551980444.jpg'),
(34, 'Kwokth', '1234', 'Kwok', '../uploads/user/1460556420748.jpg'),
(35, 'kwok', '123', 'kwok', '../img/default.jpg'),
(36, 'iphone', '123', 'iphone', '../img/default.jpg'),
(37, 'hkson', '123', 'hkson', '../img/default.jpg'),
(38, '1995', 'doge', 'watermelon1995', '../uploads/user/1462345253567.jpg'),
(39, '12300', '123', '', '../uploads/user/1460632461462.jpg'),
(40, 'testing', '123', 'tes', '../uploads/user/1462347220624.jpg'),
(41, 'windows', 'win', 'windows', '../uploads/user/1462373312741.jpg'),
(42, '123', '1234', '123', '../img/default.jpg'),
(43, 'abckwok', '123', 'kwok', '../img/default.jpg'),
(44, 'tester2', '1234', 'kwok', '../img/default.jpg'),
(45, 'tester3', '123', 'kwok', '../img/default.jpg');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `queue`
--
ALTER TABLE `queue`
  ADD CONSTRAINT `queue_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON UPDATE NO ACTION;

--
-- Constraints for table `transcation`
--
ALTER TABLE `transcation`
  ADD CONSTRAINT `transcation_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `transcation_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`uid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
