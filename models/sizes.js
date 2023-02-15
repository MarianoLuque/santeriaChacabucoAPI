const mongoose = require('mongoose')

const SizesScheme = new mongoose.Schema(
    {
        size: String
    },
    {
        timestamps: true,
        versionKey: false
    } 
)
module.exports = mongoose.model("sizes", SizesScheme)