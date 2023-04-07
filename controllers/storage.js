const { matchedData } = require('express-validator')
const {storageModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')
const {PUBLIC_URL} = require('../config/config.js')
const {saveImage, deleteImage} = require('../utils/handleImages.js')
const fs = require('fs')
const path = require('path')

const PATH = path.resolve('.')
const ruta = path.join(PATH, 'storage')

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR EN STORAGE GET ITEMS', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await storageModel.findById({_id: id})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR EN STORAGE GET ITEM', err, 500)
    }
}
const createItems = async (req, res) => {
    try{
        const file = req.files;
        let response = []
        console.log(file)
        for(const pic of file) {
            const body = {
                url: `${PUBLIC_URL}/${pic.filename}`,
                filename: pic.filename,
            };
            response.push(await storageModel.create(body));
        }
        res.send({ response })
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR EN STORAGE CREATE ITEM', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById({_id: id})
        const {filename} = dataFile
        const filePath = path.resolve(ruta, filename)
        await storageModel.findByIdAndDelete({_id: id})
        
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR EN STORAGE DELETE ITEM', err, 500)
    }
}
module.exports = {getItems, getItem, createItems, deleteItems}