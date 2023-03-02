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

AtributesScheme.statics.findAllData = async function() {
    let category = await this.find({})
        .populate({
            path: 'type',
            model: "atributosTypes"
        })
    return category
}

AtributesScheme.statics.findOneData = async function(_id) {

    const category = await this.findOne({ _id })
        .populate({
            path: 'type',
            model: "atributosTypes"
        })
    return category;
}

module.exports = mongoose.model("atributos", AtributesScheme)