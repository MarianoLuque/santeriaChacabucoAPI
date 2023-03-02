const mongoose = require('mongoose')

const AtributesTypesScheme = new mongoose.Schema(
    {
        name: {type:String, required: true},
        visualizationType: {type:String, required: true},
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("atributosTypes", AtributesTypesScheme)