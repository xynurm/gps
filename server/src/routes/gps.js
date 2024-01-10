const express = require('express');
const GPSController = require('../controller/gps');

const router = express.Router();

router.get('/:id', GPSController.findGPS);

module.exports = router;
