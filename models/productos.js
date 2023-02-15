const mongoose = require('mongoose')
const variantesModel = require ("./variantes.js")
const categoriasModel = require("./categorias.js")

const ProductScheme = new mongoose.Schema(
    {
        title:          {type: String, required: true},
        description:    {type: String, required: false},
        categoryId:     {type: mongoose.Types.ObjectId, ref: 'categorias', required: true},
        variants:       {type: [mongoose.Types.ObjectId], ref: 'variantes', required: false}
    },
    {
        timestamps: true,
        versionKey: false
    } 
)

ProductScheme.statics.findAllData = async function(page = null, limit = null, categoria = null) {
    
    const options = {};
    if (page && limit) {
        options.skip = (page - 1) * limit;
        options.limit = limit;
    }
    if (categoria) {
        options.category = categoria;
    }
    options.sort = { title: 1 };
    const product = await this.find({}, null, options)
        .populate({
            path: 'categoryId',
            model: categoriasModel
        })
        .populate({
            path: 'variants',
            model: variantesModel
        });
    return product;
}

ProductScheme.statics.findOneData = async function(_id) {

    const product = await this.findOne({ _id })
        .populate({
            path: 'categoryId',
            model: categoriasModel
        })
        .populate({
            path: 'variants',
            model: variantesModel
        });
    return product;
}

module.exports = mongoose.model("productos", ProductScheme)