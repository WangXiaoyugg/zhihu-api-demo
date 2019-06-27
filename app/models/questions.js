const { Schema, model} = require("mongoose");

const questionSchema = {
    __v: {type: Number, select: false},
    title: {type: String, required: true},
    description: {type: String, },
    questioner: {type: Schema.Types.ObjectId, ref: 'User', select: false},
}

module.exports = model("Question", questionSchema)