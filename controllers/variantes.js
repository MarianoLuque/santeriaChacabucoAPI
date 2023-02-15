const { matchedData } = require('express-validator')
const {variantesModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const data = await variantesModel.find({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET VARIANTES', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const data = await variantesModel.findById(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET VARIANTE', err, 500)
    }
}
const createItems = async (req, res) => {
    try {
        const {colorsId = [], sizesId = [], imagesId = [], price = 0} = req.body
        const body = {colorsId, sizesId, imagesId, price}
        const data = await variantesModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR CREATE VARIANTE', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {id, colorsId = [], sizesId = [], imagesId = [], price = 0} = req.body
        const body = {colorsId, sizesId, imagesId, price}
        const data = await variantesModel.findOneAndUpdate(id, body, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE VARIANTE', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        const {id} = req.params
        const data = await variantesModel.findByIdAndDelete(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE VARIANTE', err, 500)
    }
}
module.exports = {getItems, getItem, updateItems, createItems, deleteItems}