CREATE DATABASE  IF NOT EXISTS `vacation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacation`;
-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: vacation
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `followerId` int NOT NULL AUTO_INCREMENT,
  `vacationId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`followerId`),
  KEY `fk_user_vacation_follow_idx` (`userId`),
  KEY `fk_user_vacation_vacationId_idx` (`vacationId`),
  CONSTRAINT `fk_user_vacation_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_vacation_vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,21,5),(7,76,5),(9,68,5),(11,21,4),(12,68,4),(13,76,4),(14,69,4),(15,21,6),(16,68,6),(17,76,6),(18,69,6),(21,4,5),(37,77,5),(38,70,5),(39,73,5),(40,69,5),(41,74,5),(42,2,5);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'yaniv','yaniv','yaniv@gmail.com','$2b$10$3vGcFOLk3W5NTyOgfjcIoelb6ORoP1iUa.sXXjATMTtxzRcgh7cwW','user'),(5,'gabi','yak','gabi@gmail.com','$2b$10$NZSbDLqGNmbj.L1m4AlW/uLTJc9PcJpe0nHXWEjbzhLuTWQqTN78G','admin'),(6,'vladi','eokhim','vladi@gmail.com','$2b$10$3IKi0B358qli7DpCZMdp2Or28xuCuYWPz6gA0Bj560glVEIPzFl8m','user'),(63,'yogev','yogev','yogev@gmail.com','$2b$10$b4gHW.2d8s25w5Qid/SEHuhzjoLbpjl7286S1B5h0Bs.kc1N/M41O','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` int NOT NULL,
  `imageName` varchar(100) DEFAULT 'undefined',
  PRIMARY KEY (`vacationId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2,'Machu pichu, Peru.','Machu Picchu is an awe-inspiring destination nestled high in the Andes Mountains of Peru. This ancient Incan citadel holds an air of mystery and grandeur that captivates visitors from around the world. The breathtaking views of the mountainous landscape combined with the remarkable architectural ruins make Machu Picchu a truly unforgettable experience. Hiking the Inca Trail to reach this UNESCO World Heritage site is an adventure in itself, offering stunning vistas and a glimpse into the rich history of the Incan civilization. Explore the sacred temples, intricate terraces, and hidden pathways as you immerse yourself in the mystical ambiance of Machu Picchu.','2024-03-20 00:00:00','2024-04-02 00:00:00',1400,'Machu_Picchu,_Peru.jpg'),(4,'Philippines','The Philippines is a tropical paradise comprising over 7,000 islands, each offering its unique charm and beauty. With pristine white-sand beaches, crystal-clear turquoise waters, and vibrant marine life, it\'s a haven for beach lovers and diving enthusiasts. From the bustling capital of Manila to the idyllic islands of Palawan and Boracay, the Philippines offers a diverse range of experiences. Immerse yourself in the warm hospitality of the Filipino people, explore lush rice terraces in Banaue, or swim with whale sharks in Oslob. The Philippines\' natural wonders, cultural heritage, and mouthwatering cuisine make it a destination that will leave you longing for more.','2022-05-23 00:00:00','2023-06-01 00:00:00',1500,'GettyRF_985553596.jpg'),(21,'Tel-Aviv, Israel.','Israel is an enchanting destination that offers a rich tapestry of experiences for vacationers. With its diverse landscapes, cultural treasures, and historical significance, Israel is a captivating choice for travelers. From the stunning beaches along the Mediterranean Sea to the serene shores of the Dead Sea, the country boasts breathtaking natural beauty. Its cities, such as Jerusalem and Tel Aviv, blend ancient and modern elements, providing an intriguing mix of traditions and innovation. Moreover, Israel\'s historical sites, including the Western Wall and Masada, offer profound insights into its past. With vibrant culinary scenes, warm hospitality, and a vibrant cultural scene, Israel promises an unforgettable vacation for all who visit.','2023-06-14 00:00:00','2023-07-23 00:00:00',1500,'5d7f0e46-0c58-48e0-aa1e-969b39890826.jpg'),(68,'Kyoto, Japan.','A cultural gem, Kyoto offers a perfect blend of traditional charm and modern attractions. Discover serene temples, stunning cherry blossoms, and beautifully landscaped gardens. Immerse yourself in Japanese tea ceremonies and traditional arts, or stroll through historic streets lined with wooden machiya houses. Kyoto\'s rich heritage and warm hospitality make it an unforgettable experience.','2023-07-22 00:00:00','2023-07-22 00:00:00',2700,'f2ab6bc5-5f25-481e-a3b2-f22272f773a9.jpg'),(69,'Reykjavik, Iceland.','For nature lovers and adventure seekers, Reykjavik is a must-visit destination. Witness the surreal Northern Lights dance across the Arctic skies, soak in natural geothermal hot springs, and explore otherworldly landscapes of geysers, waterfalls, and glaciers. Iceland\'s unique geology and outdoor activities make it a haven for anyone seeking an unparalleled experience in nature.','2023-07-27 00:00:00','2023-09-30 00:00:00',1300,'6f4fc5f4-785b-467d-9195-f1f1e0be9c9b.jpg'),(70,'Barcelona, Spain.','Vibrant and eclectic, Barcelona captivates with its unique blend of art, architecture, and Mediterranean charm. Gaudi\'s masterpieces like Sagrada Familia and Park Güell are awe-inspiring, while the bustling La Boqueria market and picturesque beaches offer an authentic Spanish experience. Barcelona\'s rich cultural heritage and vibrant nightlife cater to diverse tastes.','2023-09-20 00:00:00','2023-10-31 00:00:00',2100,'c19eeb71-320a-4d00-afa9-f6ed9fc403fe.jpg'),(71,'Banff National Park, Canada.','Nestled in the Canadian Rockies, Banff National Park is a nature lover\'s paradise. Explore turquoise glacial lakes, hike through lush forests, and spot wildlife such as elk and bears. Whether you\'re skiing in winter or hiking in summer, Banff offers year-round beauty and outdoor activities that leave you rejuvenated and in awe of nature\'s wonders.','2024-04-16 00:00:00','2024-06-19 00:00:00',4700,'8c5b8bbd-370e-4e97-b697-93c82ce966fd.jpg'),(72,'Bora Bora, French Polynesia.','A postcard-perfect paradise, Bora Bora is famed for its overwater bungalows and pristine beaches. Dive into the clear lagoons to explore vibrant coral reefs teeming with marine life. Indulge in Polynesian spa treatments and savor delicious seafood. Bora Bora\'s idyllic setting and luxury resorts make it an exclusive retreat for those seeking an indulgent tropical escape.','2023-10-31 00:00:00','2023-12-26 00:00:00',6800,'7fd80258-6e56-4a43-ad26-ce258b95e0c5.webp'),(73,'Cape Town, South Africa.','Set against the stunning backdrop of Table Mountain, Cape Town offers a diverse and captivating experience. Discover the historic Robben Island, soak in the views from atop Table Mountain, and explore the Cape Winelands for exquisite wines. With its mix of culture, wildlife, and natural beauty, Cape Town promises an unforgettable African adventure.','2024-02-12 00:00:00','2024-02-29 00:00:00',2100,'d09d71c0-099a-4c7f-96e8-8aa65486cca3.jpeg'),(74,'New York City, USA.','The city that never sleeps, New York City is a melting pot of cultures, art, and innovation. Iconic landmarks like the Statue of Liberty, Times Square, and Central Park beckon tourists from all over the world. Explore world-class museums, indulge in diverse cuisine, and catch a Broadway show. NYC\'s energy and diversity create an unmatched urban experience.','2024-01-24 00:00:00','2024-02-13 00:00:00',7200,'21964598-0fa8-45fb-a65e-763fefaa3c0e.webp'),(75,'Queenstown, New Zealand.','Adrenaline junkies and nature enthusiasts alike will fall in love with Queenstown. Surrounded by the Southern Alps and Lake Wakatipu, the town offers thrilling activities like bungee jumping, jet boating, and skydiving. During winter, hit the slopes for world-class skiing. Queenstown\'s stunning landscapes and adventurous spirit make it an ideal destination for those seeking an adrenaline-pumping vacation.','2024-07-17 00:00:00','2024-08-14 00:00:00',4600,'ee798930-f1d3-4bdb-955c-5fe3fa02ba14.jpg'),(76,'Marrakech, Morocco.','A sensory explosion, Marrakech is a vibrant city that will transport you to another world. The bustling souks (markets) offer an array of spices, textiles, and handicrafts, while the Jardin Majorelle, a stunning garden oasis, provides respite from the hustle and bustle. Visit the iconic Koutoubia Mosque and admire the intricate Moroccan architecture. Marrakech\'s vibrant Djemaa el-Fna square comes alive at night with street performers, musicians, and mouthwatering Moroccan cuisine. Head to the Atlas Mountains for a day trip, where you can hike, visit Berber villages, and experience traditional mountain hospitality.','2023-07-27 19:19:00','2023-10-26 20:00:00',1200,'f145916a-8f4f-417f-b233-00e20e4c283d.webp'),(77,'Chiang Mai, Thailand.','Nestled in the mountains of northern Thailand, Chiang Mai is a captivating blend of ancient culture and modern charm. This city is renowned for its stunning temples, with Wat Phra Singh and Wat Chedi Luang among the most revered. Immerse yourself in the bustling Night Bazaar, where you can find handicrafts, textiles, and delicious street food. Chiang Mai is also a gateway to lush rainforests and ethnic hill tribes, offering opportunities for trekking, elephant encounters, and cultural exchanges. Don\'t miss the annual Yi Peng Lantern Festival, where thousands of floating lanterns light up the night sky, creating an ethereal atmosphere.','2023-07-26 19:24:00','2023-09-25 20:24:00',2700,'aea2e038-52cf-4c76-b62f-ceaed7484311.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 17:45:38
