-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2023 at 04:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `treedata`
--

-- --------------------------------------------------------

--
-- Table structure for table `roots_data`
--

CREATE TABLE `roots_data` (
  `id` int(255) NOT NULL,
  `name` text NOT NULL,
  `creator` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roots_data`
--

INSERT INTO `roots_data` (`id`, `name`, `creator`) VALUES
(0, 'root', 0),
(1, 'root_1', 0),
(2, 'root_2', 0),
(3, 'root_3', 0),
(4, 'root_4', 1),
(5, 'root_5', 1),
(6, 'root_6', 2),
(7, 'root_7', 2),
(8, 'root_8', 3),
(9, 'root_9', 3),
(10, 'root_10', 4),
(11, 'root_11', 5),
(12, 'root_12', 6),
(13, 'root_13', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roots_data`
--
ALTER TABLE `roots_data`
  ADD KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
