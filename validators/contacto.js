const {check} = require('express-validator')
const validateResults = require('../utils/handleValidator.js')

const validatorCreateItem = [
    check('name')
    .exists()
    .notEmpty(),
    check('email')
    .exists()
    .notEmpty(),
    check('message')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorCreateItem}