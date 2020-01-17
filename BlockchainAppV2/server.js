const helmet = require('helmet')
const compression = require('compression');
const hpp = require('hpp');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT=8080
request = require('request');
fs = require('fs');
crypto = require('crypto');
//keccak = require('keccakjs')
nodersa = require('node-rsa');


var BlockchainAdapter = require('./app/modules/blockchain_adapter/adapter.js')
var blockchainAdapter = new BlockchainAdapter();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(function (req, res, next) {
	
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

	next();
});
require('./app/routes.js')(app);

//start the server to serve request
app.listen(PORT);
console.log('SERVER IS READY TO SERVE REQUEST ON ' + PORT);
