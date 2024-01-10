const express = require('express');
const GPSController = require('../controller/gps');

const router = express.Router();

router.get('/', GPSController.getAllGPS);
router.get('/:id', GPSController.findGPS);

module.exports = router;
