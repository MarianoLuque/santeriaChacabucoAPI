const express = require('express');
const router = express.Router();
const {validatorGetItem, validatorCreateItem} = require('../validators/productos.js')
const {getItems, getItem, createItems, updateItems, deleteItems, getExcel} = require('../controllers/productos.js')
const authMiddleware = require('../middleware/session.js')

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, validatorCreateItem, createItems)
router.put('/:id', authMiddleware, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, validatorGetItem, deleteItems)
router.get('/excel/precios', getExcel)

module.exports = router