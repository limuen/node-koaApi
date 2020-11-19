/**
 * 处理微信登陆的逻辑
 */

const util = require("util");
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken }  = require('../../core/util')
const { Auth } = require('../../middlewares/auth')
class WXManager {
  static async codeToToken(code) {
    // 小程序code值 调用微信api 如果合法 返回openid(唯一标识)
    // 接收 code appid appsecret
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    );

    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new global.errs.AuthFailed("openid获取失败");
    }
    const errcode = result.data.errcode;
    const errmsg = result.data.errmsg;
    if (errcode) {
      throw new global.errs.AuthFailed("openid获取失败" + errmsg);
    }
    // 通过openid查询用户
    let user = await User.getUserByOpenid(result.data.openid)
    if(!user) {
        user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
    WXManager
}