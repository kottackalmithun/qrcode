var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TrackSchema = new Schema({
  PID: {type: String, required: true, },
  uname: {type:String, lowercase: true}, 
  LoggedIn: {type:Date } ,
  UserLat: {type: String},
  UserLong: {type:String},									// Tracking table 
  DeviceId: {type: String},
  DeviceGeo: {type: String}
});



module.exports = mongoose.model('Track',TrackSchema);