const { Schema, model} = require("mongoose");

const userSchema = {
    name: {type: String, required: true},
}

model("User", userSchema)