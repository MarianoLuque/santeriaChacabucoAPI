const express = require('express');
const router = express.Router();
const {validatorCreateItem, validatorUpdateItem, validatorDeleteItem, validatorGetItem} = require('../validators/atributos.js')
const {getItems, getItem, createItems, updateItems, deleteItems} = require('../controllers/atributos.js')
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createItems)
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorUpdateItem, validatorGetItem, updateItems)
router.delete('/', authMiddleware, checkRol(["admin"]), validatorDeleteItem, deleteItems)

module.exports = router