const express = require('express');
const router = express.Router();
const {validatorCreateItem} = require('../validators/contacto.js')
const {createItems} = require('../controllers/contacto.js')

router.post('/', validatorCreateItem, createItems)

module.exports = router