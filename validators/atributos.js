const {check} = require('express-validator')
const validateResults = require('../utils/handleValidator.js')

const validatorCreateItem = [
    check('atributos')
    .exists()
    .notEmpty()
    .isArray()
    .custom((value, { req }) => {
        value.forEach((obj) => {
            if (!obj.hasOwnProperty('value') || !obj.hasOwnProperty('type')) {
                throw new Error('Each "atributos" object must have a "value" and "type" property');
            }
        });
        return true;
    }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItem = [
    check('value')
    .exists()
    .notEmpty(),
    check('type')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetItem = [
    check('id')
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeleteItem = [
    check('atributos')
    .exists()
    .notEmpty()
    .isArray()
    .custom((value, { req }) => {
        value.forEach((obj) => {
            if (!obj.hasOwnProperty('_id')) {
                throw new Error('Each "atributos" object must have a "_id" property');
            }
        });
        return true;
    }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorGetItem, validatorDeleteItem, validatorUpdateItem, validatorCreateItem}