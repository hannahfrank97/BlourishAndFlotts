-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 21. Okt 2023 um 18:02
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `node_cc221009_10083`
--
CREATE DATABASE IF NOT EXISTS `bookdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bookdb`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `price` float NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONEN DER TABELLE `books`:
--

--
-- Daten für Tabelle `books`
--

INSERT INTO `books` (`id`, `title`, `price`, `image`) VALUES
(1, 'Hogwarts: A History', 12, 'book1.png'),
(2, 'The Standard Book of Spells', 5, 'book2.png'),
(3, 'A History of Magic', 7, 'book3.png'),
(4, 'Magical Theory', 6, 'book4.png'),
(5, 'Fantastic Beasts', 8, 'book5.png'),
(6, 'Quidditch Through the Ages', 5, 'book6.png'),
(7, 'The Tales of Beedle the Bard', 4, 'book7.png'),
(8, 'Magical Water Plants', 10, 'book8.png'),
(9, 'Defensive Magical Theory', 7, 'book9.png'),
(10, 'Guide to Advanced Transfiguration', 8, 'book10.png'),
(11, 'Advanced Potion Making', 9, 'book11.png'),
(12, 'The Dark Forces: Self-Protection', 8, 'book12.png'),
(13, 'Unfogging the Future', 5, 'book13.png'),
(14, 'The Monster Book of Monsters', 15, 'book14.png'),
(15, 'Charm Your Own Cheese', 3, 'book15.png');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `members_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONEN DER TABELLE `cart`:
--   `members_id`
--       `members` -> `id`
--

--
-- Daten für Tabelle `cart`
--

INSERT INTO `cart` (`id`, `members_id`) VALUES
(18, 7),
(19, 8),
(20, 10),
(26, 20);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `books_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `isBought` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONEN DER TABELLE `items`:
--   `books_id`
--       `books` -> `id`
--   `cart_id`
--       `cart` -> `id`
--

--
-- Daten für Tabelle `items`
--

INSERT INTO `items` (`id`, `books_id`, `cart_id`, `amount`, `isBought`) VALUES
(64, 15, 19, 3, 0),
(65, 12, 19, 1, 0),
(66, 13, 19, 1, 0),
(67, 2, 19, 2, 0),
(68, 5, 19, 1, 0),
(69, 4, 19, 1, 0),
(70, 1, 19, 1, 0),
(137, 1, 26, 1, 0),
(138, 2, 26, 1, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONEN DER TABELLE `members`:
--

--
-- Daten für Tabelle `members`
--

INSERT INTO `members` (`id`, `username`, `email`, `password`, `image`) VALUES
(3, 'CoolNeville', 'neville@hogwarts.com', '$2b$10$VC3hdkxg7nVaoSA./tN1wumnDQTt6VhgMLE4bbYjudMzTxIRkRR7W', 'member1.png'),
(4, 'SnapeLovePortions', 'snape@hogwarts.com', '$2b$10$wVUqX.eE9e5r0aROjLblauZ1.wBwrfk7sQ8uvMfRJoQMo/S6zuPQi', 'member2.png'),
(7, 'DumbledoresArmy', 'dumbledoresarmy@hogwarts.com', '$2b$10$i4VTjM/Fcfg/WO7Jzo.elOKtifuZdUWDwW3.bFcuVJNMbWrzSh7fO', 'member3.png'),
(8, 'WizardChessChamp', 'wizardchesschamp@hogwarts.com', '$2b$10$W7VLEMceNQM1MqULFPleGOh.zD.qhMd.n6qUmrbGeNLpFQMgN71xO', 'member4.png'),
(10, 'LoveBooks4-ever', 'literature@hogwarts.com', '$2b$10$facMOMDlPMdeNa/ovAaLe.d41OHBQ7UPrEfj3Egs5pMrdCleG7DPi', 'member5.png'),
(11, 'WeasleyIsOurKing', 'weasleyisourking@hogwarts.com', '$2b$10$4y7uFWe/ZGHK5LsQqVcOfulnMrUQxHJdNLHRt3rTfxMQsMxHEHcv2', 'member6.png'),
(12, 'DobbyIsFree', 'dobbyisfree@hogwarts.com', '$2b$10$0kXGZmPM3bYuxTaIpFkHieKIEbt9oSbSxeWS4/j/LRV8.nkJAksK.', 'member7.png'),
(15, 'CoolDumbledore', 'dumbledore@hogwarts.com', '$2b$10$QCr/u7jV2tyV0wrDPF2kl.cmDxG7/.FcB1cgujvzUMR7vvya8O3sO', 'member8.png'),
(20, 'bestHagrid', 'hagrid@nicehouse.com', '$2b$10$xmnHY92VUSrsBmLX/bVxyeXqfeVDjpZPIfKGeJzRIvUVwXPLULs8S', 'member9.png');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `members_id` (`members_id`);

--
-- Indizes für die Tabelle `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_books_id_books` (`books_id`),
  ADD KEY `id_cart_id_cart_id` (`cart_id`);

--
-- Indizes für die Tabelle `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT für Tabelle `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT für Tabelle `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `members_id_members_id` FOREIGN KEY (`members_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `id_books_id_books` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_cart_id_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
