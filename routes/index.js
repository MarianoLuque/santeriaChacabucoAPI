const express = require('express')
const fs = require('fs')
const path = require ('path');

const router = express.Router();

const PATH = path.resolve('.')
const PATH_ROUTES = path.join(PATH, 'routes')

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name != 'index'){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router