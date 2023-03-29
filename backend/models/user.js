const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phoneNumber: {type: String, required: true, minlength:10},
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save',async function (next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12);
  }
  next();
})

userSchema.methods.isValidPassword = async function(password){
  try{
    return await bcrypt.compare(password,this.password);
  }catch(error){
    throw error
  }
}

module.exports = mongoose.model("User", userSchema);
