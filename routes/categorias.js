const express = require('express');
const router = express.Router();
const {validatorCreateItem, validatorGetItem} = require('../validators/categorias.js')
const {getItems, getItem, createItems, updateItems, deleteItems} = require('../controllers/categorias.js')
const authMiddleware = require('../middleware/session.js')

router.get('/', authMiddleware, getItems)
router.get('/:id', authMiddleware, validatorGetItem, getItem)
router.post('/', authMiddleware, validatorCreateItem, createItems)
router.put('/:id', authMiddleware, validatorCreateItem, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, validatorGetItem, deleteItems)

module.exports = router