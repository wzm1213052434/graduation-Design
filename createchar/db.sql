use demoSystem;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for strange_chars
-- ----------------------------
DROP TABLE IF EXISTS `strange_chars`;
CREATE TABLE `strange_chars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `markdown` varchar(255) default NULL,
  `name` varchar(40) default '',
  `renderHtml` blob default NULL,
  `remark` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of strange_chars
-- ----------------------------
INSERT INTO `strange_chars` VALUES ('0', 'a', '人民文学出版社','2020021301','小说以贾、史、王、薛四大家族的兴衰为背景，以贾府的家庭琐事、闺阁闲情为脉络，以贾宝玉、林黛玉、薛宝钗的爱情婚姻故事为主线，刻画了以贾宝玉和金陵十二钗为中心的正邪两赋有情人的人性美和悲剧美');
INSERT INTO `strange_chars` VALUES ('1', 'b', '上海晨光出版公司','2020021302','本书以高超的语言艺术和对生活的深刻观察称著。作者用繁茂、幽默诙谐的比喻和反讽，配合尖酸刻薄的语言和机智幽默的文字，表现了以主人公方鸿渐为代表的知识分子在婚恋、教育、生活、事业等种种“围城”中的困境。借以深刻反映了人性中的欺诈、虚伪与懦弱，展示抗战初期知识分子的群相');
INSERT INTO `strange_chars` VALUES ('2', 'c', '人民文学出版社','2020021302','《水浒传》是以白话文写成的章回小说，列为中国古典四大文学名著之一，六才子书之一。其内容讲述北宋山东梁山泊以宋江为首的绿林好汉，由被逼落草，发展壮大，直至受到朝廷招安，东征西讨的历程。作者历来有争议，一般认为是施耐庵所著，而罗贯中则做了整理，金圣叹删修为七十回本');
INSERT INTO `strange_chars` VALUES ('3', 'd', '人民文学出版社','2020021301','该书描写了从东汉末年到西晋初年之间近百年的历史风云，反映了三国时代的政治军事斗争以及各类社会矛盾的渗透与转化。其虚实结合，曲尽其妙，是四大名著中唯一根据历史事实改编的小说，被许多人误以为该书内容就是中国三国时期的正史');

DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `permission_id` int(11) NOT NULL,
  `permission_name` varchar(255) default NULL,
  `behavior` varchar(255) default NULL,
  PRIMARY KEY  (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('0', '总管理员', 'person::add;person::delete;person::update;person::select;char::add;char::delete;char::select;char::update;');
INSERT INTO `permission` VALUES ('1', '检定员', 'char::select;');

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `permission` int(11) default NULL,
  `password` varchar(40) default NULL,
  `name` varchar(255) default NULL,
  `delete_status` int(11) default NULL,
  PRIMARY KEY  (`id`),
  KEY `permissionid` (`permission`),
  CONSTRAINT `permissionid` FOREIGN KEY (`permission`) REFERENCES `permission` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of person
-- ----------------------------
INSERT INTO `person` VALUES ('2020021301', '0', '2020021301', '李', '1');
INSERT INTO `person` VALUES ('2020021302', '1', '2020021302', '王', '1');
INSERT INTO `person` VALUES ('2020021303', '0', '2020021303', '陈一', '1');
INSERT INTO `person` VALUES ('2020021304', '0', '2020021304', '陈二', '1');
