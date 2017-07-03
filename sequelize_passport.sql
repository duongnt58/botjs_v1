-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 22, 2017 lúc 10:38 SA
-- Phiên bản máy phục vụ: 10.1.21-MariaDB
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sequelize_passport`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dates`
--

CREATE TABLE `dates` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `dateLate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `dates`
--

INSERT INTO `dates` (`id`, `userId`, `firstName`, `lastName`, `dateLate`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Nguyễn', 'Thái Dương', '2017-06-15 15:03:04', '2017-06-15 15:03:04', '2017-06-15 15:03:04'),
(2, 2, 'Nguyễn', 'Thái Dương', '2017-06-15 15:05:11', '2017-06-15 15:05:11', '2017-06-15 15:05:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `groups`
--

INSERT INTO `groups` (`id`, `name`, `about`, `createdAt`, `updatedAt`) VALUES
(1, 'Maketing', 'Nhóm maketing', '2017-06-15 14:28:01', '2017-06-15 14:28:01'),
(2, 'Năng lượng', 'Nhóm năng lượng', '2017-06-15 14:28:01', '2017-06-15 14:28:01'),
(3, 'HCNS', 'Nhóm hành chính nhân sự', '2017-06-15 14:28:01', '2017-06-15 14:28:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `timecheckouts`
--

CREATE TABLE `timecheckouts` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `timeGetout` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `timecheckouts`
--

INSERT INTO `timecheckouts` (`id`, `userId`, `firstName`, `lastName`, `timeGetout`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Nguyễn', 'Thái Dương', '2017-06-16 01:49:49', '2017-06-16 01:49:49', '2017-06-16 01:49:49'),
(2, 2, 'Nguyễn', 'Thái Dương', '2017-06-16 16:13:14', '2017-06-16 16:13:14', '2017-06-16 16:13:14'),
(3, 2, 'Nguyễn', 'Thái Dương', '2017-06-16 16:14:03', '2017-06-16 16:14:03', '2017-06-16 16:14:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `id_slack` varchar(255) DEFAULT NULL,
  `userName` text,
  `sex` enum('male','female') DEFAULT 'male',
  `birthDay` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `group` int(11) DEFAULT NULL,
  `role` enum('0','1','2') DEFAULT '0',
  `last_checkin` int(11) DEFAULT NULL,
  `last_checkout` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `id_slack`, `userName`, `sex`, `birthDay`, `email`, `group`, `role`, `last_checkin`, `last_checkout`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Trần', 'Tuấn Anh', 'U2BEM5DPD', 'anhtt', 'male', '1989-10-10', 'anhtt@vets.com.vn', 1, '1', 15, 15, 'active', '2017-06-15 14:28:01', '2017-06-15 14:28:01'),
(2, 'Nguyễn', 'Thái Dương', 'U34E1P4RK', 'duongnt', 'female', '1992-05-08', 'duongnt@vets.com.vn', 1, '0', 16, 15, 'active', '2017-06-15 14:28:01', '2017-06-16 01:49:23'),
(3, 'Nguyễn', 'Phú Bình', 'U1Z33CAGH', 'binhnp', 'male', '1991-01-10', 'binhnp@vets.com.vn', 1, '0', 15, 15, 'active', '2017-06-15 14:28:01', '2017-06-15 14:28:01'),
(4, 'Lê', 'Thị Lụa', 'U35L2KG22', 'lualt', 'female', '1995-10-30', 'lualt@vets.com.vn', 1, '0', 15, 15, 'active', '2017-06-15 14:28:01', '2017-06-15 14:28:01');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `timecheckouts`
--
ALTER TABLE `timecheckouts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dates`
--
ALTER TABLE `dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `timecheckouts`
--
ALTER TABLE `timecheckouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
