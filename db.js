const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://neha:phadtare@cluster0.rw33h7h.mongodb.net/EMICalc?retryWrites=true&w=majority")

module.exports = connection