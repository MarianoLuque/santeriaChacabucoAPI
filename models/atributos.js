const mongoose = require('mongoose')

const AtributesScheme = new mongoose.Schema(
    {
        value: {type:String, required: true},
        description: {type:String, required: false},
        type: {type: [mongoose.Types.ObjectId], ref: 'atributosTypes', required: true}
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("atributos", AtributesScheme)