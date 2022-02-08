CREATE TABLE `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0 = enable',
  `userType` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email` (`email`)
)

CREATE TABLE `album` (
  `idAlbum` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_general_nopad_ci DEFAULT NULL,
  `coverUrl` varchar(500) COLLATE utf8mb4_general_nopad_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_general_nopad_ci DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0 = enabled, 1 = desabled',
  PRIMARY KEY (`idAlbum`),
  KEY `album_FK` (`idUser`),
  CONSTRAINT `album_FK` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
)

CREATE TABLE `photo` (
  `idPhoto` int(11) NOT NULL AUTO_INCREMENT,
  `serverName` varchar(100) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL COMMENT 'tipo da foto: png, jpeg, jpg',
  `color` varchar(100) DEFAULT NULL,
  `fileName` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `datetimeCreation` varchar(100) DEFAULT NULL,
  `idAlbum` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0 = enabled, 1 = desabled',
  PRIMARY KEY (`idPhoto`),
  KEY `photo_FK` (`idAlbum`),
  CONSTRAINT `photo_FK` FOREIGN KEY (`idAlbum`) REFERENCES `album` (`idAlbum`)
)

CREATE OR REPLACE VIEW vwPhotoUser AS (
  SELECT a.idUser as idUser, p.* 
	FROM photo p
  JOIN album a ON a.idAlbum = p.idAlbum
  WHERE a.status = 0
  AND p.status = 0
)
