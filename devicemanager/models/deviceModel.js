var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var deviceSchema = new Schema({

module.exports = mongoose.model('device', deviceSchema);