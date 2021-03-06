const { HttpException } = require("../core/http-exception")

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 判断是否是生产环境 error不是httpException 输出error
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if(isDev && !isHttpException) {
            throw error
        }
        // 判断error如果是HttpException 则直接进行赋值
        if(isHttpException) {
            // 已知异常
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,
            }
            ctx.status = error.code
        } else {
            // 未知异常
            ctx.body = {
                msg: 'Request failed with status code 500',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`,
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError