const { Schema, model} = require("mongoose");

const userSchema = {
    name: {type: String, required: true},
}

module.exports = model("User", userSchema)