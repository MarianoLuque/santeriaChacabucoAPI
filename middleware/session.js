const {handleHttpError} = require('../utils/handleError.js')
const {verifyToken} = require('../utils/handleJwt.js')
const {usersModel} = require('../models/index.js')

const authMiddleware = async (req, res, next) =>{
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NECESITA UNA SESION", 401)
            return
        }
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = verify(token)

        if(!dataToken){
            handleHttpError(res, "FALTA LA DATA DEL PAYLOAD", 401)
            return
        }

        if(!dataToken._id){
            handleHttpError(res, "ERROR TOKEN ID", 401)
            return
        }
        
        const user = await usersModel.findById(dataToken._id)
        req.user = user
        next()

    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR DE SESION", 401)
    }
}
const verify = (token) => {
    return verifyToken(token)
}

module.exports = authMiddleware