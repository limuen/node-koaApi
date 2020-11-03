const { LinValidator, Rule } = require('../../core/validator')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '参数必须为正整数', {min: 1})
        ]
    }
}

module.exports = {
    PositiveIntegerValidator
}