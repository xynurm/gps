require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const gpsRoutes = require('./routes/gps.js');

app.use(express.json());
app.use(cors());

app.use('/gps', gpsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
