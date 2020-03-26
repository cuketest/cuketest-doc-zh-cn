const http = require('http');
const express = require('express');
const httpApp = express();

const port = 3001;
httpApp.use(express.static(__dirname + '/_book'));
const httpServer = http.createServer({}, httpApp);
console.log('open http://localhost:3001 to preview')
httpServer.listen(port);
