-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Jan 2025 pada 13.36
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buku_usaha`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `branch`
--

INSERT INTO `branch` (`id`, `name`, `address`) VALUES
(1, 'MK Computer 1', 'Jl. Raya Maduran No.47, Parengan, Kec. Maduran, Kabupaten Lamongan, Jawa Timur 62261'),
(2, 'MK Computer 2', 'Brondong, Kec. Brondong, Kabupaten Lamongan, Jawa Timur');

-- --------------------------------------------------------

--
-- Struktur dari tabel `branchstock`
--

CREATE TABLE `branchstock` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `branchId` int(11) NOT NULL,
  `stockQuantity` int(11) NOT NULL DEFAULT 0,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `branchstock`
--

INSERT INTO `branchstock` (`id`, `productId`, `branchId`, `stockQuantity`, `updatedAt`) VALUES
(5, 6, 1, 22, '2024-12-25 17:59:14.397'),
(6, 6, 2, 0, '2024-12-25 17:33:28.549'),
(7, 7, 1, 0, '2024-12-25 17:48:09.129'),
(8, 7, 2, 0, '2024-12-25 17:48:09.129'),
(9, 8, 1, 31, '2024-12-25 17:59:20.807'),
(10, 8, 2, 0, '2024-12-25 17:49:33.991');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(3, 'Kategori 1'),
(1, 'Kategori 2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `sellPrice` decimal(65,30) NOT NULL,
  `buyPrice` decimal(65,30) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `sellPrice`, `buyPrice`, `categoryId`) VALUES
(6, 'Produk 2', 24000.000000000000000000000000000000, 12000.000000000000000000000000000000, 1),
(7, 'Produk 3', 50000.000000000000000000000000000000, 40000.000000000000000000000000000000, 3),
(8, 'Produk 4', 20000.000000000000000000000000000000, 10000.000000000000000000000000000000, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `branchId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `purchase`
--

INSERT INTO `purchase` (`id`, `productId`, `branchId`, `quantity`, `price`, `createdAt`) VALUES
(1, 6, 1, 12, 12000.000000000000000000000000000000, '2024-12-25 17:54:08.198'),
(2, 8, 1, 21, 10000.000000000000000000000000000000, '2024-12-25 17:54:24.320'),
(3, 8, 1, 11, 10000.000000000000000000000000000000, '2024-12-25 17:54:30.700'),
(4, 6, 1, 11, 12000.000000000000000000000000000000, '2024-12-25 17:55:13.564');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `branchId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalAmount` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sale`
--

INSERT INTO `sale` (`id`, `productId`, `branchId`, `quantity`, `totalAmount`, `createdAt`) VALUES
(1, 6, 1, 1, 24000.000000000000000000000000000000, '2024-12-25 17:59:14.385'),
(2, 8, 1, 1, 20000.000000000000000000000000000000, '2024-12-25 17:59:20.798');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `branchId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `branchId`) VALUES
(3, 'mk computer 1', '$argon2id$v=19$m=65536,t=3,p=4$ZSQvrKPxLf0pBYRDBRtXFg$XU1d8H46xsHAhAq/8I5XS1yveUw4leRrWIOpKRj8FpQ', 'user', 1),
(4, 'mk computer 2', '$argon2id$v=19$m=65536,t=3,p=4$lK8k1jQLbR/MOt54hcDRPw$LoxggT0Ru7DTjHEKov45seNWxGBd1VuOiF4W5/1h15w', 'user', 2),
(5, 'admin', '$argon2id$v=19$m=65536,t=3,p=4$bynPHtbXJX9TAUvn1b9MhA$6jo29KrM6DVND0m0ovxT2ptvqFCLPuh5CLcQYFM2NlI', 'admin', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Branch_name_key` (`name`);

--
-- Indeks untuk tabel `branchstock`
--
ALTER TABLE `branchstock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BranchStock_productId_branchId_key` (`productId`,`branchId`),
  ADD KEY `BranchStock_branchId_fkey` (`branchId`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_name_key` (`name`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`);

--
-- Indeks untuk tabel `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Purchase_productId_fkey` (`productId`),
  ADD KEY `Purchase_branchId_fkey` (`branchId`);

--
-- Indeks untuk tabel `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Sale_productId_fkey` (`productId`),
  ADD KEY `Sale_branchId_fkey` (`branchId`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD KEY `User_branchId_fkey` (`branchId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `branchstock`
--
ALTER TABLE `branchstock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `branchstock`
--
ALTER TABLE `branchstock`
  ADD CONSTRAINT `BranchStock_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `BranchStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `Purchase_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Purchase_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `Sale_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Sale_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `branch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
