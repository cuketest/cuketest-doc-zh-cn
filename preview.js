const http = require('http');
const express = require('express');
const httpApp = express();

const port = 3001;
httpApp.use(express.static(__dirname + '/_book'));
const httpServer = http.createServer({}, httpApp);
httpServer.listen(port);
