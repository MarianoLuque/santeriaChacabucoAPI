const express = require('express');
const router = express.Router();
const {validatorGetItem} = require('../validators/variantes.js')
const {getItems, getItem, createItems, updateItems, deleteItems} = require('../controllers/variantes.js')
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, checkRol, createItems)
router.put('/:id', authMiddleware, checkRol, validatorGetItem, updateItems)
router.delete('/:id', authMiddleware, checkRol, validatorGetItem, deleteItems)

module.exports = router