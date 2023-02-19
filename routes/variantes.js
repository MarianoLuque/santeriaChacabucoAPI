const express = require('express');
const router = express.Router();
const {validatorGetItem} = require('../validators/variantes.js')
const {getItems, getItem, createItems, updateItems, deleteItems} = require('../controllers/variantes.js')
const authMiddleware = require('../middleware/session.js')


router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, createItems)
router.put('/:id', authMiddleware, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, validatorGetItem, deleteItems)

module.exports = router