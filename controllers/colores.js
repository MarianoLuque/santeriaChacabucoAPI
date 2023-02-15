const { matchedData } = require('express-validator')
const {coloresModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const data = await coloresModel.find({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET COLORES', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await coloresModel.findById(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET COLOR', err, 500)
    }
    
}
const createItems = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await coloresModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR CREATE COLOR', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await coloresModel.findOneAndUpdate(id, body, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE COLOR', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await coloresModel.findByIdAndDelete(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE COLOR', err, 500)
    }
}
module.exports = {getItems, getItem, updateItems, createItems, deleteItems}