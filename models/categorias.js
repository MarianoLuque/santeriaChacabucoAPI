const mongoose = require('mongoose')

const CategoryScheme = new mongoose.Schema(
    {
        name: String 
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("categorias", CategoryScheme)