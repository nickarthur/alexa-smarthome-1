var util = require('util');
var NobleDevice = require('noble-device');
var SERVICE_UUID          = 'ffb0';
var CONTROL_UUID          = 'ffb2';
var EFFECT_UUID           = 'ffb2';

var MansaaLed = function(peripheral) {
    NobleDevice.call(this, peripheral);
};

MansaaLed.SCAN_UUIDS = [SERVICE_UUID];

MansaaLed.prototype.RGBtoBuffer = function (rgbString, brightness) {
    rgbString = rgbString || "000000";
    brightness = brightness || "d1";
    var fromString = brightness + rgbString
    return Buffer.from(fromString, "hex")

};
MansaaLed.is = function(peripheral) {
    /* This is a big nono , return correct info */
    var localName = peripheral.advertisement.localName;
    console.log(localName);
    return true;
    // return ((localName === undefined) || (localName === 'Cnlight') );
};

NobleDevice.Util.inherits(MansaaLed, NobleDevice);

MansaaLed.prototype.writeServiceStringCharacteristic = function(uuid, string, callback) {
    this.writeStringCharacteristic(SERVICE_UUID, uuid, string, callback);
};

MansaaLed.prototype.writeControlCharateristic = function(red, green, blue, brightness, callback) {
    var rgbString = red + green + blue;
    var brightNess = brightness;
    var command = this.RGBtoBuffer(rgbString,brightNess);
    this.writeServiceStringCharacteristic(CONTROL_UUID, command, callback);
};

MansaaLed.prototype.turnOn = function(callback) {
    this.writeControlCharateristic( "FF", "FF", "FF", "FF", function (data) {
        callback.call(this,!!data?false:true);
    });
};

MansaaLed.prototype.turnOff = function(callback) {
    this.writeControlCharateristic("00", "00", "00", "00",function (data) {
        callback.call(this, !!data?false:true);
    });

};

MansaaLed.prototype.setColorAndBrightness = function(red, green, blue, brightness, callback) {
    function convert(integer) {
        var str = Number(integer).toString(16);
        return str.length == 1 ? "0" + str : str;
    };
    red = convert(red);
    blue = convert(blue);
    green = convert(green);
    brightness = brightness?convert(brightness):"00";

    this.writeControlCharateristic(brightness, red, green, blue, callback);
};
MansaaLed.prototype.switchOn = function(){
    console.log("Base adapter method turnon");
    this.turnOn(function () {
        console.log(arguments);
    });
    return true;
};

MansaaLed.prototype.switchOff = function(){
    console.log("Base adapter method tuenoff");
    this.turnOff(function () {
        console.log(arguments);
    });
    return true;
};

MansaaLed.prototype.setTemperature = function() {
    console.log("Method not implemented");
    return false;
};

MansaaLed.prototype.setColor = function() {
    console.log("method not implemented");
    return false;
};

MansaaLed.prototype.setColor.setBrightness = function(){
    console.log("Method not implemented");
    return false;
};
module.exports = MansaaLed;

