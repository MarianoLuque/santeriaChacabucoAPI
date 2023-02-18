const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema(
    {
        colorsId: {type: [mongoose.Types.ObjectId], ref: 'colores', required: false},
        sizesId:  {type: [mongoose.Types.ObjectId], ref: 'sizes', required: false},
        imagesId: {type: [mongoose.Types.ObjectId], ref: 'storages', required: false},
        price:    {type: Number, required: false}
    },
    {
        timestamps: true,
        versionKey: false
    } 
);

module.exports = mongoose.model("variantes", variantSchema)