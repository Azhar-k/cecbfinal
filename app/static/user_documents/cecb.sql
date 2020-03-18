-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 10, 2020 at 01:00 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cecb`
--

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email_id` varchar(100) NOT NULL,
  `mobile_number` varchar(100) NOT NULL,
  `department` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `email_id`, `mobile_number`, `department`) VALUES
(1, 'Dr. Mohandas P V', 'mohandasvp05@yahoo.com', '9447468484', 'ME'),
(2, 'P.A.Abdul Samad', 'abdulsamad@gectcr.ac.in\r\n', '9496291324', 'ME'),
(3, 'Dr. Swaraj KP', 'swarajkp@gmail.com\r\n', '9497201903', 'CSE'),
(4, 'Helen K J', 'helenkj28@gmail.com\r\n', '9446352699', 'CSE'),
(5, 'GEORGE MATHEW', 'geomat@gectcr.ac.in\r\n', '04842526282', 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `path` varchar(80) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `name`, `path`, `created_at`) VALUES
(1, 'wifi', '/forms/wifi.pdf', '2020-02-06 11:34:16'),
(2, 'apology', '/forms/apology.pdf', '2020-02-06 00:00:00'),
(3, 'admission', '/forms/admission.pdf', '2020-02-06 12:00:57'),
(4, 'bonafied', '/forms/bonafied', '2020-02-09 14:11:22'),
(5, 'GECTCR-WIFI-Student.pdf', 'GECTCR-WIFI-Student.pdf', '2020-02-17 20:49:41');

-- --------------------------------------------------------

--
-- Table structure for table `placement_statistics`
--

CREATE TABLE `placement_statistics` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `count` int(11) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `placement_statistics`
--

INSERT INTO `placement_statistics` (`id`, `company_name`, `count`, `year`) VALUES
(1, 'TCS', 170, 2019),
(2, 'CTS', 71, 2019),
(3, 'Incture', 10, 2019),
(4, 'Baton Systems', 4, 2019),
(5, 'Nissan Digital', 6, 2019),
(6, 'Mitsogo', 11, 2019),
(7, 'Baton Systems', 6, 2018),
(8, 'Spell Security', 4, 2019),
(9, 'Tarrento', 10, 2019),
(10, 'Market Simplified', 2, 2019),
(11, 'MRF', 4, 2019),
(12, 'VKC', 2, 2019),
(13, 'Infosys', 40, 2019),
(14, 'Wabco', 2, 2019);

-- --------------------------------------------------------

--
-- Table structure for table `user_documents`
--

CREATE TABLE `user_documents` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `path` varchar(200) NOT NULL,
  `security_key` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_documents`
--

INSERT INTO `user_documents` (`id`, `name`, `path`, `security_key`) VALUES
(3, 'Semester Grade Card (s5).pdf', 'Semester Grade Card (s5).pdf', 'azhar'),
(4, 'resume(18-01-2020).pdf', 'resume(18-01-2020).pdf', 'az123'),
(8, 'udemy-eng.pdf', 'udemy-eng.pdf', 'myudemy'),
(9, 'li1.pdf', 'li1.pdf', 'zxsx');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_statistics`
--
ALTER TABLE `placement_statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_documents`
--
ALTER TABLE `user_documents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `placement_statistics`
--
ALTER TABLE `placement_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_documents`
--
ALTER TABLE `user_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
