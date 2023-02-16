const { matchedData } = require('express-validator')
const {productosModel, variantesModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const {page, limit, categoria} = req.query
        const data = await productosModel.findAllData(page, limit, categoria)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET PRODUCTOS', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        const {id} = req.params
        const data = await productosModel.findOneData(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET PRODUCTO', err, 500)
    }
}
const createItems = async (req, res) => {
    try {
        const {title, description, categoryId} = req.body
        const body = {title, description, categoryId}
        const data = await productosModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR CREATE PRODUCTO', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {id} = req.params
        const {title, description, categoryId, variants} = req.body
        body = {title, description, categoryId, variants}
        const data = await productosModel.findOneAndUpdate({_id: id}, body, {new: true, upsert: false})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE PRODUCTOS', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await productosModel.findByIdAndDelete(id)
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE PRODUCTOS', err, 500)
    }
}

const updateItemsExcel = async (req, res) => {
    try {
        const {categoria} = req.query
        const {productos} = req.body
        productos.forEach(async producto => {
            const data = await productosModel.findExcelData(producto.title, categoria)
            data.variants.forEach((variante, index) => {
                variantesModel.findByIdAndUpdate({_id: variante._id}, producto.price[index], {new: true, upsert: false})
            });
        });
        
        res.send({data})
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR ACTUALIZAR PRODUCTOS EXCEL', err, 500)
    }
}

module.exports = {getItems, getItem, updateItems, createItems, deleteItems, updateItemsExcel}