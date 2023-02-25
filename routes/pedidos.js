const express = require('express');
const router = express.Router();
const {validatorCreateItem, validatorGetItem} = require('../validators/pedidos.js')
const {getItems, getItem, createItems, updateItems, deleteItems} = require('../controllers/pedidos.js')
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

/* router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createItems)
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorCreateItem, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, checkRol(["admin"]), validatorGetItem, deleteItems) */

module.exports = router