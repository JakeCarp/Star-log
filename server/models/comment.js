let mongoose = require('mongoose')

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = "Comment"

let schema = new Schema({
  description: { type: String, required: true },
  author: { type: ObjectId, ref: "User", required: true },
  log: { type: ObjectId, ref: "Log", required: true }
})




let model = mongoose.model(name, schema)

module.exports = model