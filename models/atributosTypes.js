const mongoose = require('mongoose')

const AtributesTypesScheme = new mongoose.Schema(
    {
        name: {type:String, required: true, unique: false},
        visualizationType: {type:String, required: true, unique: false},
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("atributosTypes", AtributesTypesScheme)