const express = require('express');
const router = express.Router();
const {validatorGetItem} = require('../validators/productos.js')
const {getItems, getItem, createItems, updateItems, deleteItems, updateItemsExcel} = require('../controllers/productos.js')
const authMiddleware = require('../middleware/session.js')

router.get('/', authMiddleware, getItems)
router.get('/:id', authMiddleware, validatorGetItem, getItem)
router.post('/', authMiddleware, createItems)
router.put('/:id', authMiddleware, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, validatorGetItem, deleteItems)
router.put('/', authMiddleware, updateItemsExcel)

module.exports = router