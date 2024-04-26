-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 26. 12:12
-- Kiszolgáló verziója: 10.4.24-MariaDB
-- PHP verzió: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `waredrop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_quantity` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `item_quantity`, `warehouse_id`, `is_active`) VALUES
(1, 'Alma', 23, 1, 1),
(2, 'Körte', 34, 2, 1),
(3, 'Barack', 18, 2, 1),
(4, 'Item_to_delete', 1, 1, 0),
(5, 'Ananász', 5, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `permission_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`) VALUES
(1, 'All'),
(2, 'Transactions');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'Worker');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role_has_permission`
--

CREATE TABLE `role_has_permission` (
  `permission_permission_id` int(11) NOT NULL,
  `role_role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `role_has_permission`
--

INSERT INTO `role_has_permission` (`permission_permission_id`, `role_role_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `transactions`
--

CREATE TABLE `transactions` (
  `trans_id` int(11) NOT NULL,
  `trans_post_date` datetime(3) NOT NULL,
  `trans_arrived_date` datetime(3) DEFAULT NULL,
  `trans_origin_id` int(11) NOT NULL,
  `trans_target_id` int(11) NOT NULL,
  `item_item_id` int(11) NOT NULL,
  `worker_email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `transactions`
--

INSERT INTO `transactions` (`trans_id`, `trans_post_date`, `trans_arrived_date`, `trans_origin_id`, `trans_target_id`, `item_item_id`, `worker_email`) VALUES
(1, '2024-04-26 10:07:05.670', NULL, 1, 2, 5, NULL),
(2, '2024-04-26 10:07:05.669', '2024-04-26 10:10:28.736', 1, 2, 2, 'jozsi@worker.hu');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`) VALUES
(1, 'ADMIN', 'admin@admin.hu', '$2b$10$OKVVPiZJvluMAYAAq/EhW.pAtTLYsdJ6zAtTr.vLGIn0EzOzhcsQi'),
(2, 'Teszt Elek', 'test.elek@user.hu', '$2b$10$JSrtiP65y9fd1JCX2cPrluYQfJYDPX78LiBCqJWRwCMHM/XIOrv.2'),
(3, 'Munkás József', 'jozsi@worker.hu', '$2b$10$eb2zlRZG.18i.EpIb.ziOurwUZsKOvs3HccFKJt.Q9UvZTTWo18mW');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_has_role`
--

CREATE TABLE `user_has_role` (
  `role_role_id` int(11) NOT NULL,
  `user_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user_has_role`
--

INSERT INTO `user_has_role` (`role_role_id`, `user_user_id`) VALUES
(1, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `warehouses`
--

CREATE TABLE `warehouses` (
  `warehouse_id` int(11) NOT NULL,
  `warehouse_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_user_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `warehouses`
--

INSERT INTO `warehouses` (`warehouse_id`, `warehouse_name`, `location`, `assigned_user_id`, `is_active`) VALUES
(1, 'Test_warehouse', 'Location1', 2, 1),
(2, 'Test_warehouse2', 'Location2', 2, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `warehouse_item_relation` (`warehouse_id`);

--
-- A tábla indexei `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permission_name_uk` (`permission_name`);

--
-- A tábla indexei `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name_uk` (`role_name`);

--
-- A tábla indexei `role_has_permission`
--
ALTER TABLE `role_has_permission`
  ADD PRIMARY KEY (`permission_permission_id`,`role_role_id`),
  ADD KEY `relation_7_role_fk` (`role_role_id`);

--
-- A tábla indexei `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `transaction_item_fk` (`item_item_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email_uk` (`user_email`);

--
-- A tábla indexei `user_has_role`
--
ALTER TABLE `user_has_role`
  ADD PRIMARY KEY (`role_role_id`,`user_user_id`),
  ADD KEY `relation_6_user_fk` (`user_user_id`);

--
-- A tábla indexei `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`warehouse_id`),
  ADD UNIQUE KEY `warehouse_name_uk` (`warehouse_name`),
  ADD KEY `assign_user_relation` (`assigned_user_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `transactions`
--
ALTER TABLE `transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `warehouse_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `warehouse_item_relation` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `role_has_permission`
--
ALTER TABLE `role_has_permission`
  ADD CONSTRAINT `relation_7_permisson_fk` FOREIGN KEY (`permission_permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `relation_7_role_fk` FOREIGN KEY (`role_role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transaction_item_fk` FOREIGN KEY (`item_item_id`) REFERENCES `items` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `user_has_role`
--
ALTER TABLE `user_has_role`
  ADD CONSTRAINT `relation_6_role_fk` FOREIGN KEY (`role_role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `relation_6_user_fk` FOREIGN KEY (`user_user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `warehouses`
--
ALTER TABLE `warehouses`
  ADD CONSTRAINT `assign_user_relation` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
