const mongoose = require("mongoose");
const storagesModel = require("./storage.js")

const VariantSchema = new mongoose.Schema(
    {
        atributes: {
            type: [mongoose.Types.ObjectId],
            ref: "atributos",
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

VariantSchema.statics.findAllData = async function() {
    let category = await this.find({})
        .populate({
            path: 'atributes',
            model: "atributos",
            populate: [
                { path: 'type', model: "atributosTypes"},
            ]
        })
        .populate({
            path: 'imagesId',
            model: "storages",
        })
    
    return category
}

VariantSchema.statics.findOneData = async function(_id) {

    const category = await this.findOne({ _id })
        .populate({
            path: 'atributes',
            model: "atributos",
            populate: [
                { path: 'type', model: "atributosTypes"},
            ]
        })
        .populate({
            path: 'imagesId',
            model: "storages",
        })
    return category;
}

module.exports = mongoose.model("variantes", VariantSchema);
