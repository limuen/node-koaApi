const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/user",
});

const { RegisterValidator } = require("../../validators/validator");


/**
 * 注册
 * @param
 * @email
 * @password1
 * @password2
 */
router.post("/register", async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
});

module.exports = router