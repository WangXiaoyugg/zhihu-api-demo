const { Schema, model} = require("mongoose");

const userSchema = {
    __v: {type: Number, select: false},
    name: {type: String, required: true},
    password: {type: String, required: true, select: false},
}

module.exports = model("User", userSchema)