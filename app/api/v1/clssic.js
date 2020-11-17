const Router = require('koa-router')
const router = new Router({
    prefix: "/v1/classic",
})

const { PositiveIntegerValidator }  = require('../../validators/validator')

const { Auth }  = require('../../../middlewares/auth')

router.get('/latest',new Auth().m, async (ctx, next)=>{
    // 使用scope来分级权限
    // 2
    ctx.body = ctx.auth.uid;
})  

module.exports = router
