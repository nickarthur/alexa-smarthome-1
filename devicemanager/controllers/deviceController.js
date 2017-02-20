var deviceModel = require('../models/deviceModel.js');

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