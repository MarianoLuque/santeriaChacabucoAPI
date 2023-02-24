const express = require('express');
const router = express.Router();
const {validatorRegister, validatorLogin} = require('../validators/auth.js')
const {loginCtrl, registerCtrl, loginUpdateCtrl} = require('../controllers/auth.js')
const authMiddleware = require('../middleware/session.js')

router.post('/register', validatorRegister, registerCtrl)

router.post('/login', validatorLogin, loginCtrl)

router.put('/login', authMiddleware, validatorLogin, loginUpdateCtrl)

module.exports = router