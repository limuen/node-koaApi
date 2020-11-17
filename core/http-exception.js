/**
 * 定义HttpException类 继承node里面自带的Error
 * @author LiMuEn
 * @date 2020-11-02
 * @param 参数
 * @return msg
 * @return errorCode
 * @return code 
 */
class HttpException extends Error {
    constructor(msg="服务器异常", errorCode=10000, code=400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

/**
 * 继承HttpException定义code值为400的时候返回类
 * @author LiMuEn
 * @date 2020-11-02
 * @param 参数
 * @return code
 * @return msg
 * @return errorCode 
 */
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

/**
 * 继承HttpException定义code值为201的时候返回类
 * 201为新增时候返回的参数， 200是查询的标识
 * @author LiMuEn
 * @date 2020-11-15
 * @param 参数
 * @return msg
 * @return errorCode 
 */
class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

/**
 * 继承HttpException定义code值为404的时候返回类
 * 404为返回的参数
 * @author LiMuEn
 * @date 2020-11-17
 * @param 参数
 * @return msg
 * @return errorCode 
 */
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

/**
 * 继承HttpException定义code值为401的时候返回类
 * 401为返回的参数 授权失败
 * @author LiMuEn
 * @date 2020-11-17
 * @param 参数
 * @return msg
 * @return errorCode 
 */
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

/**
 * 继承HttpException定义code值为403的时候返回类
 * 403为返回的参数 禁止访问
 * @author LiMuEn
 * @date 2020-11-17
 * @param 参数
 * @return msg
 * @return errorCode 
 */
class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden
}