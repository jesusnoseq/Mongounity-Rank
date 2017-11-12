const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
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
