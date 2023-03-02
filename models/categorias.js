const mongoose = require('mongoose')

const CategoryScheme = new mongoose.Schema(
    {
        name: String,
        subcategories: {type: [mongoose.Types.ObjectId], ref: 'categorias', required: false},
    },
    {
        timestamps: true,
        versionKey: false
    } 
)

CategoryScheme.statics.findAllData = async function() {
    let category = await this.find({})
        .populate({
            path: 'subcategories',
            model: "categorias",
            populate: [
                { path: 'subcategories', model: "categorias" }
            ]
        })
    
    return category
}

CategoryScheme.statics.findOneData = async function(_id) {

    const category = await this.findOne({ _id })
        .populate({
            path: 'subcategories',
            model: "categorias",
            populate: [
                { path: 'subcategories', model: "categorias" }
            ]
        })
    return category;
}

module.exports = mongoose.model("categorias", CategoryScheme)