/*
Date: 2022-9-222 18:36:12
*/

CREATE DATABASE `comic_forum` DEFAULT CHARACTER SET utf8;

USE `comic_forum`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) DEFAULT NULL,
  `nickname` varchar(64) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '3',
  `email` varchar(64) DEFAULT NULL,
  `userface` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

INSERT INTO `user` VALUES ('1', 'admin', 'admin_forum', '$2a$10$EKC0rOYd7fFu3d.NVDG0huhNidfXYcWqmqGgsO40G08mmpDH6gFFy', '1', 'sysnet@qq.com', ' ');
INSERT INTO `user` VALUES ('2', 'regular', 'regular_forum', '$2a$10$EKC0rOYd7fFu3d.NVDG0huhNidfXYcWqmqGgsO40G08mmpDH6gFFy', '2', 'regular@qq.com', ' ');
INSERT INTO `user` VALUES ('3', 'visitor', 'visitor_forum', '$2a$10$EKC0rOYd7fFu3d.NVDG0huhNidfXYcWqmqGgsO40G08mmpDH6gFFy', '3', 'regular@qq.com', ' ');

DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `classify_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT	NULL,
  PRIMARY KEY (`classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
INSERT INTO `classify` VALUES ('1','日漫');
INSERT INTO `classify` VALUES ('2','国创');
INSERT INTO `classify` VALUES ('3','3D');
INSERT INTO `classify` VALUES ('4','美漫');

DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `forum_id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
	`classify_id` int(11) NOT NULL,
	`collects` int(11) DEFAULT NULL,
	`likes` int(11) DEFAULT NULL,
  PRIMARY KEY (`forum_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
INSERT INTO `forum` VALUES ('1','傻逼帖子题目1','傻逼帖子内容1','1','25','100');
INSERT INTO `forum` VALUES ('2','傻逼帖子题目2','傻逼帖子内容3','4','325','100');
INSERT INTO `forum` VALUES ('3','傻逼帖子题目3','傻逼帖子内容4','2','725','200');

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
	`forum_id` int(11) NOT NULL,
  `root_comment_id` int(11) DEFAULT NULL,
  `to_comment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

INSERT INTO `comment` VALUES ('1','傻逼根评论1','2','2','0','0');
INSERT INTO `comment` VALUES ('2','傻逼评论','2','2','1','0');
INSERT INTO `comment` VALUES ('3','傻逼评论','2','2','1','2');

DROP TABLE IF EXISTS `board`;
CREATE TABLE `board` (
  `board_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `broad_time` varchar(255) NOT NULL,
  PRIMARY KEY (`broad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

INSERT INTO `broad` VALUES ("1","这是一条公告！","2022-09-20");