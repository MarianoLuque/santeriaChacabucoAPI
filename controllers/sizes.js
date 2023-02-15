const { matchedData } = require('express-validator')
const {sizesModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const data = await sizesModel.find({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET TAMAÑOS', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await sizesModel.findById(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET TAMAÑO', err, 500)
    }
    
}
const createItems = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await sizesModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR CREATE TAMAÑO', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await sizesModel.findOneAndUpdate(id, body, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE TAMAÑO', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await sizesModel.findByIdAndDelete(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE TAMAÑO', err, 500)
    }
}
module.exports = {getItems, getItem, updateItems, createItems, deleteItems}