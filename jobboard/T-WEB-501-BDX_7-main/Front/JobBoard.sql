-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: JobBoard
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Companies`
--

DROP TABLE IF EXISTS `Companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Companies` (
  `idCompany` int(11) NOT NULL,
  `NameCompany` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `MailCompany` varchar(255) DEFAULT NULL,
  `Adress` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  PRIMARY KEY (`idCompany`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Companies`
--

LOCK TABLES `Companies` WRITE;
/*!40000 ALTER TABLE `Companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `Companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Informations`
--

DROP TABLE IF EXISTS `Informations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Informations` (
  `idInfo` int(11) NOT NULL,
  `idPost` int(11) DEFAULT NULL,
  `DateInfo` date DEFAULT NULL,
  `InfoStatus` varchar(255) DEFAULT NULL,
  `idUsers` int(11) DEFAULT NULL,
  PRIMARY KEY (`idInfo`),
  KEY `idPost` (`idPost`),
  KEY `Informations_ibfk_2` (`idUsers`),
  CONSTRAINT `Informations_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `advertissements` (`idPost`),
  CONSTRAINT `Informations_ibfk_2` FOREIGN KEY (`idUsers`) REFERENCES `Users` (`idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Informations`
--

LOCK TABLES `Informations` WRITE;
/*!40000 ALTER TABLE `Informations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Informations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `idUsers` int(11) NOT NULL AUTO_INCREMENT,
  `Mail` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `CV` text DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'thib.chm@gmail.com','Thibault','CHAUMONT',NULL,NULL,NULL,NULL,'$2b$10$qXnBvxdfv2Chm/Rm9jjKheFyzg8bp9XcsOJsvlEwFlmk8hBy00wpq');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advertissements`
--

DROP TABLE IF EXISTS `advertissements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advertissements` (
  `idPost` int(11) NOT NULL,
  `idCompany` int(11) NOT NULL,
  `NamePost` varchar(255) NOT NULL,
  `AboutPost` int(11) NOT NULL,
  `Salary` decimal(15,2) NOT NULL,
  `postDate` date NOT NULL,
  `jobType` varchar(50) NOT NULL,
  PRIMARY KEY (`idPost`),
  KEY `idCompany` (`idCompany`),
  CONSTRAINT `advertissements_ibfk_1` FOREIGN KEY (`idCompany`) REFERENCES `Companies` (`idCompany`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertissements`
--

LOCK TABLES `advertissements` WRITE;
/*!40000 ALTER TABLE `advertissements` DISABLE KEYS */;
/*!40000 ALTER TABLE `advertissements` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12  9:59:04
