const uploadMiddleware = require('../utils/handleStorage.js')
const express = require('express');
const router = express.Router();
const {validatorGetItem} = require('../validators/storage.js')
const {getItems, getItem, createItems, deleteItems} = require('../controllers/storage.js')
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', authMiddleware, checkRol, uploadMiddleware.array("file", 10) , createItems )
router.delete('/:id', authMiddleware, checkRol, validatorGetItem, deleteItems)

module.exports = router