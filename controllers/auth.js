const { matchedData } = require('express-validator')
const {compare, encrypt} = require('../utils/handlePassword.js')
const {usersModel} = require('../models/index.js')
const {tokenSign} = require('../utils/handleJwt.js')
const {handleHttpError} = require('../utils/handleError.js')

const registerCtrl = async (req, res) => {
    try {
        const{name, email, rol} = req.body
        const password = await encrypt(req.body.password)
        const body = {name, email, password, rol}

        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, { strict: false })
    
        const data = {
            user: dataUser
        }
        res.send({data})
    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR DE REGISTRO DE USUARIO", error, 500)
    }
}

const loginCtrl = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await usersModel.findOne({email: email}).select('password name email rol')
        if(!user){ 
            handleHttpError(res, "USUARIO INEXISTENTE", "", 401)
            return
        }
        const hashPassword = user.get('password')
        const check = await compare(password, hashPassword)
        if(!check){
            handleHttpError(res, "CONTRASEÑA INVALIDA", "", 401)
            return
        }
        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({data})

    }catch (error) {
        handleHttpError(res, "ERROR DE LOGIN", error, 401)
    }
}
const loginUpdateCtrl = async (req, res) => {
    try{
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {password}
        const user = await usersModel.findOneAndUpdate(req.email, body, {new: true})
        if(!user){ 
            handleHttpError(res, "USUARIO INEXISTENTE", "", 401)
            return
        }
        
        user.set('password', undefined, {strict:false})
        const data = {
            user
        }
        res.send({data})

    }catch (error) {
        handleHttpError(res, "ERROR DE ACTUALIZACION DE USUARIO", error, 401)
    }
}

module.exports = {registerCtrl, loginCtrl, loginUpdateCtrl}