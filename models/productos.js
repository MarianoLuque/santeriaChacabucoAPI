const mongoose = require('mongoose')
const variantesModel = require ("./variantes.js")
const categoriasModel = require("./categorias.js")
const storagesModel = require("./storage.js")
const coloresModel = require("./colores.js")
const sizesModel = require("./sizes.js")

const ProductScheme = new mongoose.Schema(
    {
        title:          {type: String, default:"Producto sin nombre"},
        description:    {type: String, required: false},
        categoryId:     {type: [mongoose.Types.ObjectId], ref: 'categorias', required: true},
        variants:       {type: [mongoose.Types.ObjectId], ref: 'variantes', required: false}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

ProductScheme.statics.findAllData = async function(page = null, limit = null, categoria = null, titulo = null, precio = null) {
    
    const options = {};
    const match = categoria ? { categoryId: categoria } : {};
    if (page && limit) {
        options.skip = (page - 1) * limit;
        options.limit = limit;
    }
    if(titulo){
        options.sort = { title: 1 };
    }
    
    let product = await this.find(match, null, options)
        .populate({
            path: 'categoryId',
            model: categoriasModel,
            populate: [
                { path: 'subcategories', model: categoriasModel, populate: [
                    { path: 'subcategories', model: categoriasModel}
                ] }
            ]
        })
        .populate({
            path: 'variants',
            model: variantesModel,
            populate: [
                { path: 'atributes', model: "atributos" },
                { path: 'imagesId', model: storagesModel }
            ]
        })

        /*if (precio) {
            product = product.sort((a, b) => {
                const aPrice = Math.min(...a.variants.map(v => v.price));
                const bPrice = Math.min(...b.variants.map(v => v.price));
                return aPrice - bPrice;
            });
        }*/
    return product;
}

ProductScheme.statics.findOneData = async function(_id) {

    const product = await this.findOne({ _id })
        .populate({
            path: 'categoryId',
            model: categoriasModel,
            populate: [
                { path: 'subcategories', model: categoriasModel, populate: [
                    { path: 'subcategories', model: categoriasModel}
                ] }
            ]
        })
        .populate({
            path: 'variants',
            model: variantesModel,
            populate: [
                { path: 'atributes', model: "atributos" },
                { path: 'imagesId', model: storagesModel }
            ]
        })
    return product;
}

ProductScheme.statics.findExcelData = async function(titulo, categoria) {

    const match = { categoryId: categoria, title:titulo };
    const product = await this.findOne(match)
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