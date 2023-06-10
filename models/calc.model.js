const mongoose = require("mongoose")

const calcSchema = mongoose.Schema({
    "loan" : {type : Number, required: true},
    "interestRate" : {type : Number, required: true},
    "tenure" : {type : Number, required: true}
})

const CalcModel = mongoose.model("calc", calcSchema)

module.exports = CalcModel