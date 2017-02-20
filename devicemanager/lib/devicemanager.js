var fs = require("fs");
var adapters = [];
var path = require("path");

// Require all adapters


var DeviceManager = function () {
    this.adapters = {};
    this.devices = {};
    this.loadAdapters();
    this.discover()
};

DeviceManager.prototype.loadAdapters = function () {
    var adapterPath = fs.readdirSync(__dirname + '/../adapters').forEach(function (file) {
        console.log(file);
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            var name = file.replace('.js', '');
            console.log(__dirname + '/../adapters/' + file);
            this.adapters[name] = require('../adapters/' + file);
        }
    }.bind(this));
    return this.modules;
};

DeviceManager.prototype.moduleDiscovered = function (device,module) {
    console.log("Discovered");
    // console.log(device);
    this.devices[device.uuid] = device;
    this.devices[device.uuid]['adapter'] = module;
    // this.devices[device.uuid]['adapter'].on('connect', function () {
    //     // Device is connected, mark is ready
    // });

    this.devices[device.uuid]['adapter'].on('disconnect', function () {
        console.log("Disconnected");
        console.log(arguments);
        // Device is disconnected, mark not ready
        this.devices[device.uuid]['connected'] = false;
    }.bind(this));

    this.devices[device.uuid]['adapter'].on('connect', function () {
        console.log("connected");
        console.log(arguments);
        // Device is disconnected, mark not ready
        this.devices[device.uuid]['connected'] = true;
    }.bind(this));

    this.devices[device.uuid]['adapter'].connectAndSetup(function (err) {
        if(err) {
        }else{
            console.log("connected");
            console.log(arguments);
            this.devices[device.uuid]['connected'] = true;
        }
    }.bind(this));
};

DeviceManager.prototype.getConnectedDevices = function (device,module) {
    var activeDevices = {};
    Object.keys(this.devices).forEach(function (uuid) {
        this.devices[uuid]['connected'] === true ?activeDevices[uuid] = this.devices[uuid]:"";
    }.bind(this))
    return activeDevices;
};



DeviceManager.prototype.discover = function (callback) {
    console.log("Discovering devices from" + Object.keys(this.adapters).length + " modules");
    Object.keys(this.adapters).forEach(function (moduleKey) {
        // console.log(this.adapters);
        this.adapters[moduleKey].discover(this.moduleDiscovered.bind(this,module));
    }.bind(this))

};

DeviceManager.prototype.control = function (device) {

};

module.exports = DeviceManager;