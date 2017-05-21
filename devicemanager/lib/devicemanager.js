var fs = require("fs");
var adapters = [];
var path = require("path");

// Require all adapters

const DISCOVERY_TIMEOUT = 60000;
var DeviceManager = function () {
    this.adapters = {};
    this.devices = {};
    this.loadAdapters();
    setTimeout(function () {
        this.stopDiscovery();
    }.bind(this),DISCOVERY_TIMEOUT); // Stop auto discovery after 20 seconds
    this.discover()
};

DeviceManager.prototype.loadAdapters = function () {
    var adapterPath = fs.readdirSync(__dirname + '/../adapters').forEach(function (file) {
        console.log(file);
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            var name = file.replace('.js', '');
            console.log(__dirname + '/../adapters/' + file);
            this.adapters[name] =   require('../adapters/' + file);
        }
    }.bind(this));

};

DeviceManager.prototype.moduleDiscovered = function (device,module) {
    console.log("Discovered");
    // console.log(device);
    this.devices[module.uuid] = device;
    this.devices[module.uuid]['adapter'] = module;
    // this.devices[device.uuid]['adapter'].on('connect', function () {
    //     // Device is connected, mark is ready
    // });

    this.devices[module.uuid]['adapter'].on('disconnect', function () {
        console.log("Disconnected");
        console.log(arguments);
        // Device is disconnected, mark not ready
        this.devices[module.uuid]['connected'] = false;
        this.discover();
    }.bind(this));

    this.devices[module.uuid]['adapter'].on('connect', function () {
        console.log("connected");
        console.log(arguments);
        // Device is disconnected, mark not ready
        this.devices[module.uuid]['connected'] = true;
    }.bind(this));

    this.devices[module.uuid]['adapter'].connectAndSetup(function (err) {
        if(err) {
        }else{
            console.log("connected");
            console.log(arguments);
            this.devices[module.uuid]['connected'] = true;
        }
    }.bind(this));
};

DeviceManager.prototype.getConnectedDevices = function (device,module) {
    // if the discovery is stopped, resume the discovery


    var activeDevices = {};
    Object.keys(this.devices).forEach(function (uuid) {
        this.devices[uuid]['connected'] === true ?activeDevices[uuid] = this.devices[uuid]:"";
    }.bind(this));
    return activeDevices;
};



DeviceManager.prototype.discover = function (callback) {
    setTimeout(function () {
        this.stopDiscovery();
    }.bind(this),DISCOVERY_TIMEOUT);
    console.log("Discovering devices from " + Object.keys(this.adapters).length + " modules");
    Object.keys(this.adapters).forEach(function (moduleKey) {
        console.log("Discovering Devices from " + moduleKey);
        // console.log(this.adapters);
        this.adapters[moduleKey].discover(this.moduleDiscovered.bind(this,module));
    }.bind(this))

};

DeviceManager.prototype.control = function (deviceId,params) {
    this.devices[deviceId].call(this,params.action,params.data)
};

DeviceManager.prototype.stopDiscovery = function () {
    Object.keys(this.adapters).forEach(function (moduleKey) {
        console.log("Stopping Device Discovery from " + moduleKey);
        // console.log(this.adapters);
        this.adapters[moduleKey].stopDiscover(this.moduleDiscovered.bind(this,module));
    }.bind(this))
};

module.exports = DeviceManager;