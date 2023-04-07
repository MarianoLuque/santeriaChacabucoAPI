const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const PATH = path.resolve('.')
        const pathStorage = path.join(PATH, 'storage')
        cb(null, pathStorage)
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop()
        const filename = `file-${Date.now()}.${ext}`
        cb(null, filename)
    }
})

const uploadMiddleware = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024}
})

module.exports = uploadMiddleware