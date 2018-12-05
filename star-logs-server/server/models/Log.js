let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "Log"

let schema = new Schema({
  author: { type: ObjectId, ref: "User" },
  description: { type: String, required: true },
  rank: { type: Number, ref: "User" },
  ship: { type: ObjectId, ref: "Ship" }
})




let model = mongoose.model(name, schema)

module.exports = model