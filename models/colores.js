const mongoose = require('mongoose')

const ColorsScheme = new mongoose.Schema(
    {
        name: String,
        color: String
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("colores", ColorsScheme)