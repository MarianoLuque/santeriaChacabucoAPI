const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
    {
        atributos: {
            type: [mongoose.Types.ObjectId],
            ref: "atributo",
            required: false,
        },
        imagesId: {
            type: [mongoose.Types.ObjectId],
            ref: "storages",
            required: false,
        },
        price: { type: Number, required: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


module.exports = mongoose.model("variantes", variantSchema);
