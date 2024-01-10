const GPSModels = require('../models/gps');

const findGPS = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await GPSModels.findGPS(id);

    if (data.length > 0) {
      res.json({
        message: 'Success',
        data: data
      });
    } else {
      res.status(404).json({
        message: 'Data Not Found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error
    });
  }
};

module.exports = {
  getAllGPS,
  findGPS
};
