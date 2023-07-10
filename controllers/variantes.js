const { matchedData } = require('express-validator')
const {variantesModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const data = await variantesModel.findAllData()
        res.send({data})
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR GET VARIANTES', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const data = await variantesModel.findOneData(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET VARIANTE', err, 500)
    }
}
const createItems = async (req, res) => {
    try {
        const {atributes, imagesId, price} = req.body
        const body = {atributes, imagesId, price}
        const data = await variantesModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR CREATE VARIANTE', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {id} = req.params
        const {atributes, imagesId, price} = req.body
        const body = {atributes, imagesId, price}
        const data = await variantesModel.findOneAndUpdate({_id: id}, body, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE VARIANTE', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        const {id} = req.params
        const data = await variantesModel.findByIdAndDelete({_id: id})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE VARIANTE', err, 500)
    }
}
module.exports = {getItems, getItem, updateItems, createItems, deleteItems}