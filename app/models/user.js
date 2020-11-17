const bcrypy = require('bcryptjs')
const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    console.log(user, 'user')
    if(!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    // user.password === plainPassword
    const correct = bcrypy.compareSync(plainPassword, user.password)
    if(!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }
} 

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
