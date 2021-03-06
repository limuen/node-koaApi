const { LinValidator, Rule } = require("../../core/validator");

const  { User }  = require('../models/user')
const { LoginType } = require('../lib/enum')
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [new Rule("isInt", "参数必须为正整数", { min: 1 })];
    }
}

/**
 * 注册
 */
class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.email = [new Rule('isEmail', '不符合Email规范')];
        this.password1 = [
            new Rule('isLength', '密码不符合规范', { min: 6, max: 32 }),
            new Rule('matches', '密码至少6个字符，最多32个字符', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ];
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }

    /**
     * @description 自定义验证email
     * @param {*} vals 所有的参数对象集合
     * @findOne 查找数据库 对象
     * @where where用来指定查询条件 也是个对象
     */
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(user) {
            throw new Error('email已存在')
        }
    }

}

class TokenValidator extends LinValidator {
    constructor() {
        super();
        this.account = [
            new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符',  { min: 6, max: 128 })
        ]
    }

    // 验证type是否被传入
    validateLoginType(vals) {
        if(!vals.body.type) {
            throw new Error('type是必传参数')
        }
        if(!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }

    // 验证如果是邮箱登陆，则密码必传
    validateEmailPassword(vals) {
        const isEmail = vals.body.type === LoginType.USER_EMAIL
        if(isEmail) {
            if(!vals.body.secret) {
                throw new Error('密码不能为空')
            }
        }
    }
}

// 验证type是否被传入
function checkType(vals) {
    if(!vals.body.type) {
        throw new Error('type是必传参数')
    }
    if(!LoginType.isThisType(vals.body.type)) {
        throw new Error('type参数不合法')
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

class LikeValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.validateType = checkType
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator
};
