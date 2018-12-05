let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let Objectid = Schema.Types.ObjectId
const SALT = 10
let name = "User"

let schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  assignment: { type: Objectid, ref: "Ship" },
  rank: { type: Number, required: true }
})



schema.statics.hashpassword = function (password) {
  return bcrypt.hashSync(password, SALT)
}


schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

let model = mongoose.model(name, schema)

module.exports = model