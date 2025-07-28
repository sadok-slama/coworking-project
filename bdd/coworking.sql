-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: coworking_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking_packs`
--

DROP TABLE IF EXISTS `booking_packs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_packs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_packs`
--

LOCK TABLES `booking_packs` WRITE;
/*!40000 ALTER TABLE `booking_packs` DISABLE KEYS */;
INSERT INTO `booking_packs` VALUES (1,'PC','PC pro en bonne etat','10',200.00,'2025-06-23 23:59:26','2025-07-17 14:27:57'),(2,'PS 4','PACK ?','5',100.00,'2025-06-24 00:01:53','2025-07-17 14:27:40'),(3,'Pack','meilleur resultat','10',4000.00,'2025-07-09 12:52:24','2025-07-17 14:33:09'),(5,'Pack esprit','dev web/mobile','365',1200.00,'2025-07-17 14:32:42','2025-07-17 15:28:06');
/*!40000 ALTER TABLE `booking_packs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `pack_id` bigint unsigned NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookings_pack_id_foreign` (`pack_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,'mohamed','mohamed@esprit.tn','2025-06-29',1,2,'2025-06-21 23:53:47','2025-06-22 10:41:18'),(8,'sadokslama','sadokslama20@gmail.com','2025-07-07',1,2,'2025-07-07 12:08:06','2025-07-16 08:03:26'),(9,'sadok slama','sadokslamasadok@gmail.com','2025-07-09',1,1,'2025-07-07 12:40:42','2025-07-07 12:54:52'),(17,'reser','sadokslamasadok@gmail.com','2025-07-17',2,1,'2025-07-17 10:55:35','2025-07-17 10:55:45'),(18,'anoir hmidi','anoir@gmail.com','2025-07-20',3,0,'2025-07-17 14:11:45','2025-07-17 14:11:45'),(19,'achraf slama','achraf@gmail.com','2025-08-30',2,0,'2025-07-17 14:12:33','2025-07-17 14:12:33'),(20,'mortadha neji','neji@outlook.fr','2025-10-24',3,0,'2025-07-17 14:13:34','2025-07-17 14:13:34'),(21,'sarra sassi','sarrasassi@hotmail.fr','2025-10-03',1,1,'2025-07-17 14:15:14','2025-07-17 14:15:20');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (2,'Decoration','Maintenance',500.00,'2025-07-16','2025-06-23 22:42:56','2025-07-17 15:38:38'),(3,'salaire dep info','Salaires',750.00,'2025-07-13','2025-06-23 22:46:30','2025-07-17 15:39:53'),(5,'PC','Autre',2500.00,'2025-07-24','2025-06-23 23:05:31','2025-07-17 14:21:55'),(6,'immeuble','Loyer',530.50,'2025-07-15','2025-07-07 12:41:50','2025-07-17 15:39:39'),(7,'Fourniture scolaire','Fournitures',120.00,'2025-07-08','2025-07-07 12:42:46','2025-07-17 15:39:00'),(9,'voiture','Autre',400.00,'2025-08-07','2025-07-07 12:49:50','2025-07-17 15:32:18');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2025_06_19_150053_create_products_table',1),(7,'2025_06_19_150104_create_bookings_table',1),(8,'2025_06_19_150120_create_sales_table',1),(9,'2025_06_19_150133_create_expenses_table',1),(10,'2025_06_22_180724_create_sales_table',2),(11,'2025_06_19_150100_create_booking_packs_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'default','f0a54861169476a74de8a6eb7ac6c2f628aae525d189853fcbdc403f97b8217f','[\"*\"]','2025-06-25 23:24:01',NULL,'2025-06-20 00:04:06','2025-06-25 23:24:01'),(2,'App\\Models\\User',2,'default','4626dd85058e669027d81a100c6cfaaaef338a379468dc681aea0458e98c0a60','[\"*\"]',NULL,NULL,'2025-06-20 10:49:29','2025-06-20 10:49:29'),(3,'App\\Models\\User',2,'default','df6ac9cf97b1a11fc125f9032e9b126202adee3a463cb2b8af3c70a199a4d251','[\"*\"]',NULL,NULL,'2025-06-20 10:49:43','2025-06-20 10:49:43'),(4,'App\\Models\\User',3,'default','1cd4ec721daca663b70c6b8ec89cc3e43f6168bafe9070f0d53249a1f82e2153','[\"*\"]',NULL,NULL,'2025-06-20 10:52:21','2025-06-20 10:52:21'),(5,'App\\Models\\User',3,'default','4271a90c8a9413c9f07258b259e6218c65b78a32f9c3c1ef82df0faf8d63bb35','[\"*\"]','2025-06-22 18:03:39',NULL,'2025-06-20 10:55:36','2025-06-22 18:03:39'),(6,'App\\Models\\User',3,'default','60e983b08f9b49e859c72b30467a375152eccaed19d2dca8fc5367bb925d5b8a','[\"*\"]','2025-06-22 18:03:55',NULL,'2025-06-22 18:03:46','2025-06-22 18:03:55'),(7,'App\\Models\\User',3,'default','5d0e2669b8dd775272146d90572d37b758740401360e623e71d2c4f3c0480087','[\"*\"]','2025-06-22 18:06:19',NULL,'2025-06-22 18:03:58','2025-06-22 18:06:19'),(8,'App\\Models\\User',3,'default','e3c63a3d0589a3268ebaa2522d3927e823cabf2c9fd470e716c846e06a285d9e','[\"*\"]','2025-06-23 23:06:42',NULL,'2025-06-22 18:06:22','2025-06-23 23:06:42'),(9,'App\\Models\\User',3,'default','3fe2b7c53578f9fbae0a2d852c2d1a402b20b58793c372137ccff6225e0b66f0','[\"*\"]','2025-06-24 00:02:33',NULL,'2025-06-23 23:06:45','2025-06-24 00:02:33'),(10,'App\\Models\\User',3,'default','12d1388eadd03e4addd8ed41fd26c65a8750a93658611aebfe77dab54dc49cbc','[\"*\"]','2025-06-24 11:47:26',NULL,'2025-06-24 00:02:35','2025-06-24 11:47:26'),(11,'App\\Models\\User',3,'default','0b6337e9af4dff2c51906481f68fd7ed860eba79589ec89a61e87b19326e2725','[\"*\"]','2025-06-24 11:54:27',NULL,'2025-06-24 11:47:28','2025-06-24 11:54:27'),(12,'App\\Models\\User',3,'default','c4d54b2547cd0845d1a2e323ba82169a79499c9327fe56f69c8e9efabfa61ddf','[\"*\"]',NULL,NULL,'2025-06-24 11:54:30','2025-06-24 11:54:30'),(13,'App\\Models\\User',3,'default','391ae94b7ea5407d75275d8adf149752b3b6eb1310a98ad65bc8f645cc9fd989','[\"*\"]','2025-06-25 23:12:55',NULL,'2025-06-24 11:54:32','2025-06-25 23:12:55'),(14,'App\\Models\\User',3,'default','2a82928ef83912bd0d5a14d5baa67eadc5cd1923effb6b8f16e3dc207030acd2','[\"*\"]','2025-07-15 14:17:17',NULL,'2025-06-25 23:25:07','2025-07-15 14:17:17'),(15,'App\\Models\\User',3,'default','49c366e7fb67f450b5e2bf63d9dcb09cf50f705a15f7aa1972d33e783d4641ed','[\"*\"]','2025-07-16 11:07:30',NULL,'2025-07-15 14:18:24','2025-07-16 11:07:30'),(16,'App\\Models\\User',3,'default','2f3d4ae0bdfb2f9c8c6607afe3d82b9af6672e89c2f8f22cf156be31b167c20c','[\"*\"]','2025-07-16 11:09:01',NULL,'2025-07-16 11:08:59','2025-07-16 11:09:01'),(17,'App\\Models\\User',3,'default','8d123350cf2b3794e3ddd50219b40b7c89b6ab564fa1aca4b0f29697b2540042','[\"*\"]','2025-07-16 13:23:18',NULL,'2025-07-16 11:22:35','2025-07-16 13:23:18'),(18,'App\\Models\\User',3,'default','5a8dd3c994e9dfc07c714f78aa20ef3a1e398f07b88587dc2b1f4e5c9ed9f762','[\"*\"]','2025-07-16 13:24:50',NULL,'2025-07-16 13:23:51','2025-07-16 13:24:50'),(19,'App\\Models\\User',3,'default','d403af756c1c6e34087024abda211a933acd1b32468eabe6bcd52a590ef4a0db','[\"*\"]','2025-07-16 13:25:10',NULL,'2025-07-16 13:25:08','2025-07-16 13:25:10'),(20,'App\\Models\\User',3,'default','ef121ace448f8140c888bd2780314c88ab8a15f2ec8b8c5b791a6bf916dc9625','[\"*\"]','2025-07-16 13:25:52',NULL,'2025-07-16 13:25:44','2025-07-16 13:25:52'),(21,'App\\Models\\User',3,'default','1a4bb49c9796f9ec1b94fcec1bf9168db7955fceb2d450070b7a5675e0b8c4fa','[\"*\"]','2025-07-16 13:29:01',NULL,'2025-07-16 13:26:07','2025-07-16 13:29:01'),(22,'App\\Models\\User',3,'default','1d3917973de2b026e96c3d6feaf3b4ed16d77b3f253e8f815fe1b517b3b26c96','[\"*\"]','2025-07-16 13:32:23',NULL,'2025-07-16 13:32:21','2025-07-16 13:32:23'),(23,'App\\Models\\User',3,'default','b4f25563f046ece40d174edca83d9fc52cb1d5da0fdfc7de40fe50a4072f3250','[\"*\"]','2025-07-17 10:01:38',NULL,'2025-07-16 13:32:22','2025-07-17 10:01:38'),(24,'App\\Models\\User',3,'default','8fe558dc2bbe3618dc1852211e3232e51512a06ac24e3e2be00043450a7c7ea3','[\"*\"]','2025-07-17 10:41:07',NULL,'2025-07-17 10:01:53','2025-07-17 10:41:07'),(25,'App\\Models\\User',3,'default','5a3b50d7a7a2072b7da6fd22ec9ae877091d72399906bd564207a2ee17aba95a','[\"*\"]','2025-07-17 10:41:39',NULL,'2025-07-17 10:41:19','2025-07-17 10:41:39'),(26,'App\\Models\\User',3,'default','9f86cc0d01c4d8eeb83c69d4ea49482cc5430d468251579655cbfce2bc02da0f','[\"*\"]','2025-07-17 10:41:46',NULL,'2025-07-17 10:41:44','2025-07-17 10:41:46'),(27,'App\\Models\\User',3,'default','30d16e3232b46199de7366ec77eaac6b673af66b17bd28be1dea7c07e7692194','[\"*\"]','2025-07-17 10:45:10',NULL,'2025-07-17 10:45:08','2025-07-17 10:45:10'),(28,'App\\Models\\User',3,'default','74eedb2e9cc6ad9439a551c9207b266954504fefe6f2f42f60de5e4cb0f2c726','[\"*\"]','2025-07-17 10:46:39',NULL,'2025-07-17 10:45:19','2025-07-17 10:46:39'),(29,'App\\Models\\User',3,'default','24b072b64eb307fe6d98958387b24540aa432c8420869b8208de2a7a9aeec5b4','[\"*\"]','2025-07-17 10:56:18',NULL,'2025-07-17 10:46:43','2025-07-17 10:56:18'),(30,'App\\Models\\User',4,'default','46f9e61d2bdb7538c33ebd4d31a5055ebb3db9d1a5bbd403fb8d3bd41c0cae99','[\"*\"]','2025-07-17 11:11:59',NULL,'2025-07-17 11:11:57','2025-07-17 11:11:59'),(31,'App\\Models\\User',4,'default','b4871e3427d7a1113b3d384e114d7ea512a3ad90a2b65bf6bd1aaf658a9e7276','[\"*\"]','2025-07-17 11:13:13',NULL,'2025-07-17 11:13:11','2025-07-17 11:13:13'),(32,'App\\Models\\User',4,'default','a0f3119fd6473a2a27889941ecc62c510279365e144c25dfc8fef451461810f9','[\"*\"]','2025-07-21 11:07:14',NULL,'2025-07-17 13:59:04','2025-07-21 11:07:14'),(33,'App\\Models\\User',4,'default','d259956f351ec8e807b734e9a779c962ff8bd282587454bf527cf1bb6a2fed21','[\"*\"]','2025-07-21 11:09:37',NULL,'2025-07-21 11:07:26','2025-07-21 11:09:37');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Chaise',40.00,'2025-06-19 23:35:53','2025-06-22 18:07:26'),(3,'Stylo',2.50,'2025-06-20 00:08:48','2025-06-20 00:08:48'),(5,'carte',130.00,'2025-06-21 19:18:58','2025-07-17 15:30:40'),(6,'iphone',2500.00,'2025-06-24 11:42:42','2025-07-17 15:29:02'),(7,'chargeur',80.85,'2025-06-24 11:42:55','2025-07-17 15:30:13');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `payment_method` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_product_id_foreign` (`product_id`),
  CONSTRAINT `sales_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,3,100,250.00,'cash','2025-07-11','2025-06-22 17:27:44','2025-07-17 15:36:51'),(2,5,4,520.00,'card','2025-07-10','2025-06-22 23:37:58','2025-07-11 12:36:34'),(4,5,6,780.00,'transfer','2025-07-14','2025-06-27 07:34:21','2025-07-17 15:36:28'),(6,2,14,560.00,'cash','2025-07-12','2025-06-27 07:45:27','2025-07-17 15:37:10'),(7,5,10,1300.00,'card','2025-04-02','2025-06-27 10:03:11','2025-06-27 21:06:49'),(8,2,16,640.00,'cash','2025-07-17','2025-06-27 20:15:57','2025-07-17 15:35:52'),(9,2,1,40.00,'cash','2025-06-27','2025-06-27 20:47:14','2025-06-27 20:47:14'),(10,2,10,400.00,'cash','2025-07-15','2025-06-27 20:47:37','2025-07-17 15:34:33'),(11,5,1,130.00,'cash','2025-07-08','2025-07-07 12:37:12','2025-07-09 14:42:56'),(12,2,10,400.00,'cash','2025-07-09','2025-07-07 12:43:28','2025-07-09 14:42:25'),(13,5,3,390.00,'cash','2025-07-16','2025-07-16 08:02:39','2025-07-17 15:33:26');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sadok','sadok@example.com',NULL,'$2y$12$87.aK1AdkOEQygKQRFul/u2SH2dzQB/6S7/CsZ4.qr9PRxUvdE3YK',NULL,'2025-06-20 00:04:06','2025-06-20 00:04:06'),(2,'sadok slama','sadokslama@esprit.tn',NULL,'$2y$12$hSxkY49emJ2BU1XquV3Q.OgwHCCRiSZjXWWydZP3i0MOkwYdWMCxO',NULL,'2025-06-20 10:49:29','2025-06-20 10:49:29'),(3,'aze','sad@gmail.com',NULL,'$2y$12$mu8CKQupIfbNaqfTPJbGPu1Z99.GKCJCPoUuE6OFshQ7Z5sLIu/he',NULL,'2025-06-20 10:52:21','2025-06-20 10:52:21'),(4,'mohamed','mohamed@gmail.com',NULL,'$2y$12$ODLlHWjXrMU56udi9CbKo.OvG55aqBB2yHL4vK0sLWxKojPdUYUYK',NULL,'2025-07-17 11:11:57','2025-07-17 11:11:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-21 13:18:41
