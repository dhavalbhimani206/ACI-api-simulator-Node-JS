// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({
	site_id: process.env.TURBO_APP_ID
})
const express = require('express')
const https = require('https');
const app = express() // initialize app

const fs = require('fs');

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

vertex.configureApp(app)
app.use(vertex.setContext(process.env))


// import routes
const index = require('./routes/index')
const api = require('./routes/api')

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes

var httpsServer = https.createServer(options, app);
httpsServer.listen(443, "0.0.0.0");

// app.listen(80, '0.0.0.0')
module.exports = app