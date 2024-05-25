const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name:{type:String},
    date:{type:String},
    time:{type:String},
    content:{type:String},
    color:{type:String}
})

const operation = mongoose.model("message", ProductSchema);

module.exports = operation;