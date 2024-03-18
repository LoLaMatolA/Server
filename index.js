const http = require('http');
const fs = require('fs');

var index =  fs.readFileSync( 'C:/Users/91907/Desktop/Major Project/Website/udb.html');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
const parser = new ReadlineParser();

port.pipe(parser);
parser.on('data', console.log);


var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io')(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
});

app.listen(3000);
