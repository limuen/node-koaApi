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
 * 201为新增时候返回的参数， 200是查询
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

module.exports = {
    HttpException,
    ParameterException,
    Success
}