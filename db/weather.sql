-- SET sql_mode = 'NO_BACKSLASH_ESCAPES';

-- DROP DATABASE IF EXISTS weather;

-- CREATE DATABASE weather;

-- USE weather;

-- CREATE TABLE users (
-- 	id INTEGER AUTO_INCREMENT NOT NULL,
-- 	username VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY(id)

-- );

-- CREATE TABLE places (
-- 	id INTEGER AUTO_INCREMENT NOT NULL,
-- 	name VARCHAR(255) UNIQUE NOT NULL,
-- 	latitude VARCHAR(255) NOT NULL,
-- 	longitude VARCHAR(255) NOT NULL,
-- 	username INTEGER(255) NOT NULL,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY (username) REFERENCES `users`(`id`)
	
-- );	

-- CREATE TABLE commutes (
-- 	id INTEGER AUTO_INCREMENT NOT NULL,
-- 	origin VARCHAR(255) NOT NULL,
-- 	destination VARCHAR(255) NOT NULL,
-- 	arriveordepart VARCHAR(1) NOT NULL,
-- 	name VARCHAR(255) NOT NULL,
-- 	username VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY(id),
-- 	FOREIGN KEY (origin) REFERENCES `places`(`id`),
-- 	FOREIGN KEY (destination) REFERENCES `places`(`id`),
-- 	FOREIGN KEY (username) REFERENCES `users`(`id`)
-- );




