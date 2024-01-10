const connection = require('../config/database');

const getAllGPS = () => {
  const SQLQuery = 'SELECT * FROM gps';

  return connection.query(SQLQuery);
};

const findGPS = (id) => {
  const SQLQuery = `SELECT * FROM gps WHERE device_id='${id}'`;

  return connection.query(SQLQuery);
};

module.exports = {
    getAllGPS,
    findGPS,
}