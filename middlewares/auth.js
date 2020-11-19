const basicAuth = require('basic-auth')

const jwt = require('jsonwebtoken')

/**
 * 权限封装类
 */
class Auth {
    constructor(level) {
        this.level = level ||  1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
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

            // 控制权限分级
            if(decode.scope < this.level) {
                errMsg = '权限不足'
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

    static verifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = {
    Auth
}