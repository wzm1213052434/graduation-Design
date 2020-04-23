DROP TABLE IF EXISTS `strange_chars`;
CREATE TABLE `strange_chars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `markdown` varchar(255) default NULL,
  `name` varchar(40) default '',
  `renderHtml` blob default NULL,
  `remark` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;