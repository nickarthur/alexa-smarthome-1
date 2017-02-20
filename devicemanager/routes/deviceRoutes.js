var express = require('express');
var router = express.Router();
var deviceController = require('../controllers/deviceController.js');

/*
 * GET
 */
router.get('/', deviceController.list);

/*
 * GET
 */
router.get('/:id', deviceController.show);

/*
 * POST
 */
router.post('/', deviceController.create);

/*
 * PUT
 */
router.put('/:id', deviceController.update);

/*
 * DELETE
 */
router.delete('/:id', deviceController.remove);

module.exports = router;
