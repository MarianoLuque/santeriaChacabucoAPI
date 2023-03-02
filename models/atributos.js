const mongoose = require('mongoose')

const AtributesScheme = new mongoose.Schema(
    {
        value: {type:String, required: true},
        description: {type:String, required: false},
        type: {type:String, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("atributos", AtributesScheme)