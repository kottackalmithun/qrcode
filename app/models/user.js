var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//1.create schema
var RegisterSchema = new Schema({
  username: {type: String,required: true,unique: true},
  email: {type:String, lowercase: true, required: true},
  password: {type: String,required: true},
  Regdate: {type: Date},
  Expdate: {type: Date},
  QRGenerated: {type: Number },
  QRRemain: {type: Number},
  paid: {type: Boolean}
});

//encrypting password before saving it to schema
RegisterSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password,null,null,function(err,hash){
    if(err) return next(err);
    user.password = hash;
    next();
  });
  
});


//validating password

RegisterSchema.methods.comparePassword = function(password){

	return bcrypt.compareSync(password,this.password);

};


//2.exporting schema - model name is 'Admin' and schema variable is 'AdminSchema'
module.exports = mongoose.model('User',RegisterSchema);

//3. Define Admin in server.js