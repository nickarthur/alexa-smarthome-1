var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var deviceSchema = new Schema({	'applianceId' : String,	'manufacturerName' : String,	'version' : String,	'friendlyName' : String,	'friendlyDescription' : String,	'isReachable' : Boolean,	'additionalApplianceDetails' : {	 	type: Schema.Types.ObjectId,	 	ref: 'INSERT_YOUR_REFERENCE_NAME_HERE'	}});

module.exports = mongoose.model('device', deviceSchema);
