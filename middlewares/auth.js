const basicAuth = require('basic-auth')

const jwt = require('jsonwebtoken')

/**
 * 权限封装类
 */
class Auth {
    constructor() {

    }

    get m() {
        return async (ctx, next) => {
            // 对token进行检测
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            if(!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                // token不合法 || token过期
                if(error.name == "TokenExpiredError") {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }
            
            // uid,scope存放到ctx上下文，便于何时何地能取出来
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()


        }
    }
}

module.exports = {
    Auth
}