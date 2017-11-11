const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const SHA256 = require('crypto-js/sha256');

const conf = require('./conf');


// DB setup
mongoose.connect(conf.mongo);

// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server setup
const port = process.env.PORT || 3900;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port:', port);
/*
const salt="X$2a$10$vDDYTZC4jRmpBOLkcaTw.";
console.log("msj: "+SHA256(salt));
console.log("msj: "+SHA256(new Buffer(salt).toString('base64').toString('utf8')));
console.log("msj: "+SHA256(new Buffer(salt).toString('ascii')));
console.log("msj: "+SHA256(new Buffer(salt).toString('utf8')));
console.log("msj: "+SHA256(salt));
*/
//Buffer.from(salt, 'base64').toString('ascii'));
