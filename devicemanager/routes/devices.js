var express = require('express');
var router = express.Router();
// var DeviceManager = require('../lib/devicemanager.js');

/* GET devices listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/discover', function(req, res, next) {
    console.log("discovering devices");
    // console.log(req.app.settings.deviceManager.getConnectedDevices());
    var devices = req.app.settings.deviceManager.getConnectedDevices();
    var discoveredApps = [];
    var AlexaDiscoveredArr = [];
    Object.keys(devices).forEach(function (device) {
        discoveredApps.push(devices[device].adapter);
        // console.log(devices[device].adapter);
    });
    discoveredApps.forEach(function (dev) {
        AlexaDiscoveredArr.push({
            applianceId: dev.uuid,
            manufacturerName: 'Some Device',
            modelName: 'ST01',
            version: 'VER01',
            friendlyName: 'Dummy light',
            friendlyDescription: 'the light in kitchen',
            isReachable: true,
            additionalApplianceDetails: {
                /**
                 * OPTIONAL:
                 * We can use this to persist any appliance specific metadata.
                 * This information will be returned back to the driver when user requests
                 * action on this appliance.
                 */
                'fullApplianceId': dev.uuid
            }
        })
    });
    res.send(AlexaDiscoveredArr);
});

router.get('/control', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
