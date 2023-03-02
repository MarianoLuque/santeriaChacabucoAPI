const { matchedData } = require('express-validator')
const {atributosModel} = require('../models/index.js')
const {handleHttpError} = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const data = await atributosModel.find({})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET ATRIBUTOS', err, 500)
    }
}
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await atributosModel.findById({_id: id})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR GET ATRIBUTO', err, 500)
    }
    
}
const createItems = async (req, res) => {
    try {
        const {value, type} = matchedData(req)
        const {description} = req.body
        const body = {value, type, description}
        const data = await atributosModel.create(body)
        res.send({data})
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR CREATE ATRIBUTO', err, 500)
    }  
}
const updateItems = async (req, res) => {
    try {
        const {value, type} = matchedData(req)
        const {description} = req.body
        const body = {value, type, description}
        const {id} =  req.params
        const data = await atributosModel.findOneAndUpdate({_id: id}, body, {new: true})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR UPDATE ATRIBUTO', err, 500)
    }
}
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await atributosModel.findByIdAndDelete({_id: id})
        res.send({data})
    } catch (err) {
        handleHttpError(res, 'ERROR DELETE ATRIBUTO', err, 500)
    }
}
module.exports = {getItems, getItem, updateItems, createItems, deleteItems}