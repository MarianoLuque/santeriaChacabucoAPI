const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.js')

const tokenSign =  (user) => {
    const sign = jwt.sign({
        _id: user._id
    },
    JWT_SECRET,
    {
        expiresIn: "2h"
    })
    return sign
}

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
        
    } catch (err) {
        return null
    }
}
module.exports = {tokenSign, verifyToken}