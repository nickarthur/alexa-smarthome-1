/**
 * deviceController.js
 *
 * @description :: Server-side logic for managing devices.
 */
module.exports = {

    /**
     * deviceController.list()
     */
    list: function (req, res) {
        deviceModel.find(function (err, devices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting device.',
                    error: err
                });
            }
            return res.json(devices);
        });
    },

    /**
     * deviceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        deviceModel.findOne({_id: id}, function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting device.',
                    error: err
                });
            }
            if (!device) {
                return res.status(404).json({
                    message: 'No such device'
                });
            }
            return res.json(device);
        });
    },

    /**
     * deviceController.create()
     */
    create: function (req, res) {
        var device = new deviceModel({
            applianceId : req.body.applianceId,
            manufacturerName : req.body.manufacturerName,
            version : req.body.version,
            friendlyName : req.body.friendlyName,
            friendlyDescription : req.body.friendlyDescription,
            isReachable : req.body.isReachable,
            additionalApplianceDetails : req.body.additionalApplianceDetails
        });

        device.save(function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating device',
                    error: err
                });
            }
            return res.status(201).json(device);
        });
    },

    /**
     * deviceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        deviceModel.findOne({_id: id}, function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting device',
                    error: err
                });
            }
            if (!device) {
                return res.status(404).json({
                    message: 'No such device'
                });
            }

            device.applianceId = req.body.applianceId ? req.body.applianceId : device.applianceId;
            device.manufacturerName = req.body.manufacturerName ? req.body.manufacturerName : device.manufacturerName;
            device.version = req.body.version ? req.body.version : device.version;
            device.friendlyName = req.body.friendlyName ? req.body.friendlyName : device.friendlyName;
            device.friendlyDescription = req.body.friendlyDescription ? req.body.friendlyDescription : device.friendlyDescription;
            device.isReachable = req.body.isReachable ? req.body.isReachable : device.isReachable;
            device.additionalApplianceDetails = req.body.additionalApplianceDetails ? req.body.additionalApplianceDetails : device.additionalApplianceDetails;

            device.save(function (err, device) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating device.',
                        error: err
                    });
                }

                return res.json(device);
            });
        });
    },

    /**
     * deviceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        deviceModel.findByIdAndRemove(id, function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the device.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
