const Router = require('koa-router')
const router = new Router()

const { PositiveIntegerValidator }  = require('../../validators/validator')

const { ParameterException } = require('../../../core/http-exception')

router.post('/v1/:id/classic/latest', async (ctx, next)=>{
    const path = ctx.params;
    const query = ctx.request.query;
    const headers = ctx.request.header;
    const body = ctx.request.body;

  
    /* 实例化验证类 */
    /* 调用类里面的方法 validate 所有的参数都保存在ctx里面 所以要把ctx作为参数传递进去 */   
    const v = await new PositiveIntegerValidator().validate(ctx) 
    const id = v.get('path.id', parsed = false)
    console.log(id, '--------------------id')
    ctx.body = { key: 'classic' }   
})  

module.exports = router
