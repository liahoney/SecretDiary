

require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();

const cors = require("cors");

const https = require('https').createServer(app);
https.listen(4000, function () {
  console.log('listening on 4000')
}); 

module.exports = https;




