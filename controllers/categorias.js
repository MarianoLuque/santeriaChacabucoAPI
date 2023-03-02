const { matchedData } = require('express-validator')
const {categoriasModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const data = await categoriasModel.findAllData({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET CATEGORIAS', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await categoriasModel.findOneData(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET CATEGORIA', err, 500)
    }
    
}
const createItems = async (req, res) => {
    try {
        const {subcategories} = req.body
        const {name} = matchedData(req)
        const body = {name, subcategories}
        const data = await categoriasModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR CREATE CATEGORIA', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {name, subcategories} = req.body
        const body =  {name, subcategories}
        const {id} = req.params
        const data = await categoriasModel.findOneAndUpdate({_id: id}, body, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE CATEGORIA', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await categoriasModel.findByIdAndDelete({_id: id})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE CATEGORIA', err, 500)
    }
}

module.exports = {getItems, getItem, updateItems, createItems, deleteItems}