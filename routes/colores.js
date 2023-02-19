const express = require('express');
const router = express.Router();
const {validatorCreateItem, validatorGetItem} = require('../validators/colores.js')
const {getItems, getItem, createItems, updateItems, deleteItems} = require('../controllers/colores.js')
const authMiddleware = require('../middleware/session.js')

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, validatorCreateItem, createItems)
router.put('/:id', authMiddleware, validatorCreateItem, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, validatorGetItem, deleteItems)

module.exports = router