const Router = require("koa-router");
const { LoginType } = require("../../lib/enum");
const { TokenValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

// 引入jwtToken
const { generateToken } = require('../../../core/util')

const router = new Router({
  prefix: "/v1/token",
});

router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')) {
      case LoginType.USER_EMAIL:
        token = await emailLogin(v.get('body.account'), v.get('body.secret'))
        break;
      case LoginType.USER_MINI_PROGRAM:
        break;
      default:
        throw new global.errs.NotFound('没有相对应的处理函数')
    }
    // 把当前的token返回给前端
    ctx.body = {
      token
    }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  // jwt
  console.log(user.id)
  return token = generateToken(user.id, 2)
}

module.exports = router