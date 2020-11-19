const Router = require("koa-router");
const { LoginType } = require("../../lib/enum");
const { TokenValidator,NotEmptyValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

// 引入jwtToken
const { generateToken } = require('../../../core/util')

const { Auth }  = require('../../../middlewares/auth');
const { WXManager } = require("../../services/wx");

const router = new Router({
  prefix: "/v1/token",
});

router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx);
    // 业务逻辑
    // 1.在API接口编写
    // 2.在Model 分层写


    // 业务分层 Model，在Model上边建一个Service层
    // 
    let token;
    switch (v.get('body.type')) {
      case LoginType.USER_EMAIL:
        token = await emailLogin(v.get('body.account'), v.get('body.secret'))
        break;
      case LoginType.USER_MINI_PROGRAM:
        token = await WXManager.codeToToken(v.get('body.account'))
        break;
      case LoginType.ADMIN_EMAIL:
        break;
      default:
        throw new global.errs.NotFound('没有相对应的处理函数')
    }
    // 把当前的token返回给前端
    ctx.body = {
      token
    }
})

router.post('/verify', async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    result
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  // jwt
  console.log(user.id)
  return token = generateToken(user.id, Auth.USER)
}

module.exports = router