DROP DATABASE IF EXISTS `company`;
CREATE DATABASE `company`;
USE `company`;

CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `salary` decimal(10,0) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DEPARTMENT_idx` (`department_id`),
  CONSTRAINT `DEPARTMENT` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_idx` (`role_id`),
  KEY `MANAGER_idx` (`manager_id`),
  CONSTRAINT `MANAGER` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `ROLE` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
);