require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(4000, function () {
  console.log('listening on 4000')
}); 


