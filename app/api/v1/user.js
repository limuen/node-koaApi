const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/user",
});

const { RegisterValidator } = require("../../validators/validator");
const { User } = require("../../models/user")

/**
 * 注册
 * @param
 * @email
 * @password1
 * @password2
 */
router.post("/register", async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    

     
    console.log(user, 'user')
    User.create(user)
});

module.exports = router