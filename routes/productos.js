const express = require('express');
const router = express.Router();
const {validatorGetItem, validatorCreateItem} = require('../validators/productos.js')
const {getItems, getItem, createItems, updateItems, deleteItems, getExcel} = require('../controllers/productos.js')
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createItems)
router.put('/:id', authMiddleware, checkRol(["admin"]), validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, checkRol(["admin"]), validatorGetItem, deleteItems)
router.get('/excel/precios', authMiddleware, checkRol(["admin"]), getExcel)

module.exports = router