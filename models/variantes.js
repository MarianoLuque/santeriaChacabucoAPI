const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema(
    {
        colorsId: [mongoose.Types.ObjectId], required: false,
        sizesId:  [mongoose.Types.ObjectId], required: false,
        imagesId: [mongoose.Types.ObjectId], required: false,
        price:    Number, required: false
    },
    {
        timestamps: true,
        versionKey: false
    } 
);

module.exports = mongoose.model("variantes", variantSchema)