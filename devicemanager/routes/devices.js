var express = require('express');
var router = express.Router();
var ResponseFactory = require("../lib/ResponseFactory");
var alexaActions = new (require("../lib/AlexaActions"));


/* GET devices listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
    var devices = req.app.settings.deviceManager.getConnectedDevices();
    console.log("discovering devices");
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
            friendlyName: 'Monkey',
            friendlyDescription: 'the light in kitchen',
            isReachable: true,
            actions: [
                'turnOff',
                'turnOn'
            ]
            ,
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

router.get('/list', function(req, res, next) {
    console.log("discovering devices");
    req.app.settings.deviceManager.getConnectedDevices();
    res.send(AlexaDiscoveredArr);
});

router.get('/control/:deviceid/action/:action/params', function(req, res, next) {
    var devices = req.app.settings.deviceManager.getConnectedDevices();
    var response = (devices[req.params.deviceid]).adapter[alexaActions.getActionMethod(req.params.action)](function (response) {
        res.send(ResponseFactory(req.params,req.query,response));
    });
});

module.exports = router;
