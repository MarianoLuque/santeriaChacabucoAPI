const {handleHttpError} = require('../utils/handleError.js')

const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req
        const rolesByUser = user.rol
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if(!checkValueRol){
            handleHttpError(res, "USUARIO SIN PERMISOS", 403)
            return
        }
        next()
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR CHECK PERMISSIONS", 403)
    }
}

module.exports = checkRol