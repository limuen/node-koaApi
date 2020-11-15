const bcrypy = require('bcryptjs')
const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

class User extends Model {}

/**
 * @description 生成mysql User表
 */
User.init(
  {
    // 主键 关系型数据库
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        // 密码加密 需要盐, genSaltSync默认值为10
        const salt = bcrypy.genSaltSync(10);
        // 调用hashSync进行加密
        const psw = bcrypy.hashSync(val, salt);
        // model属性操作 直接this===model调用setDataValue存放到数据库
        this.setDataValue('password', psw)
      },
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  { sequelize, tableName: "user" }
);

module.exports = {
  User,
};
