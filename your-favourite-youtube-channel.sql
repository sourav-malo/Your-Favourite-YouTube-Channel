-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2020 at 07:38 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `your-favourite-youtube-channel`
--

-- --------------------------------------------------------

--
-- Table structure for table `channel`
--

CREATE TABLE `channel` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `channel_url` varchar(255) NOT NULL,
  `logo_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channel`
--

INSERT INTO `channel` (`id`, `title`, `channel_url`, `logo_url`) VALUES
(1, 'freeCodeCamp.org', 'https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ', 'https://yt3.ggpht.com/a/AATXAJwFt03RAznOsPwlfo5c1kW1rp-1o3Xgpw9MNreQMQ=s100-c-k-c0xffffffff-no-rj-mo'),
(2, 'Moshiur', 'https://www.youtube.com/channel/UCcPGGA2RWx6C5o1xl18vUWA', 'https://yt3.ggpht.com/a/AATXAJxCr4YUcVVqqdEwrOowHmCvbjKLzARti4U0kqiB=s100-c-k-c0xffffffff-no-rj-mo'),
(3, 'Dark Code', 'https://www.youtube.com/channel/UCD3KVjbb7aq2OiOffuungzw', 'https://yt3.ggpht.com/a/AATXAJwFdgGg8C4SE-tLg1ZOF3HVid9o32Gnp8QNSX1StQ=s100-c-k-c0xffffffff-no-rj-mo'),
(4, 'Julio Codes', 'https://www.youtube.com/channel/UCeHWTyAKBv_WnW8gsEKGECw', 'https://yt3.ggpht.com/a/AATXAJwNGcbFGSpAbaIsonsLtd7lOjYOCF5EFkkYqTNjBQ=s100-c-k-c0xffffffff-no-rj-mo'),
(5, 'Online Tutorials', 'https://www.youtube.com/channel/UCbwXnUipZsLfUckBPsC7Jog', 'https://yt3.ggpht.com/a/AATXAJwBtKw7erVLtS31HvYvlsqSZ5tPti-kxeJNjEebiQ=s100-c-k-c0xffffffff-no-rj-mo'),
(6, 'Web Dev Simplified', 'https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw', 'https://yt3.ggpht.com/a/AATXAJzlhhukYsdgVeuIspbug5SNo_254oqP9ZyrY2E0=s100-c-k-c0xffffffff-no-rj-mo'),
(7, 'whatsdev', 'https://www.youtube.com/channel/UC0tRdbXVDbhaRvZPKsRgmxg', 'https://yt3.ggpht.com/a/AATXAJyjxOwl9VQSoBGpGnRg4pemzptdTDalfVwSRMN1Aw=s100-c-k-c0xffffffff-no-rj-mo'),
(8, 'Thapa Technical', 'https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA', 'https://yt3.ggpht.com/a/AATXAJwReHmC6QihHak4rs9IyN-i_PJw9U----fLrhWfHA=s100-c-k-c0xffffffff-no-rj-mo'),
(9, 'Traversy Media', 'https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA', 'https://yt3.ggpht.com/a/AATXAJw6qBlNzbAweKz7UlC44hYLoEtdoXGmzN8IJno3mg=s100-c-k-c0xffffffff-no-rj-mo'),
(10, 'Kevin Powel', 'https://www.youtube.com/channel/UCJZv4d5rbIKd4QHMPkcABCw', 'https://yt3.ggpht.com/a/AATXAJwEYMLm54q5CX7NwBsUrETHMZvMca9tp-3vxrorBA=s100-c-k-c0xffffffff-no-rj-mo'),
(11, 'Dani Krossing', 'https://www.youtube.com/channel/UCzyuZJ8zZ-Lhfnz41DG5qLw', 'https://yt3.ggpht.com/a/AATXAJx6TRb2UtlFRUrc1y8izsVdh5KgI1kYYBdZTwigIQ=s100-c-k-c0xffffffff-no-rj-mo'),
(12, 'Celever Programmer', 'https://www.youtube.com/channel/UCqrILQNl5Ed9Dz6CGMyvMTQ', 'https://yt3.ggpht.com/a/AATXAJydjgDHqK3vz4iHkrPZjHSsjwh1aPsqOwxHCZ_ISA=s100-c-k-c0xffffffff-no-rj-mo'),
(13, 'Easy Tutorials', 'https://www.youtube.com/channel/UCkjoHfkLEy7ZT4bA2myJ8xA', 'https://yt3.ggpht.com/a/AATXAJz3SEKxDump1_WJK18Zj6KN4F66XMuweqrmJGuhOw=s100-c-k-c0xffffffff-no-rj-mo'),
(14, 'The Net Ninja', 'https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg', 'https://yt3.ggpht.com/a/AATXAJyWnmk6Ql70o3P-x2eHIR01SiiYamhspnAN04zhWA=s100-c-k-c0xffffffff-no-rj-mo'),
(15, 'Daily Tution', 'https://www.youtube.com/channel/UCrG2Z0usOCCdUTAr4D1A8mw', 'https://yt3.ggpht.com/a/AATXAJxezKduumrqYcY85c-cQI0os2Bo14y3xc0QmnFR_A=s100-c-k-c0xffffffff-no-rj-mo');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `channel_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD KEY `channel_id` (`channel_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `channel`
--
ALTER TABLE `channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
