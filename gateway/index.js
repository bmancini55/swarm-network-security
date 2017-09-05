
let http = require('http');
let express = require('express');
let app = express();

const SERVICE_HOST = process.env.SERVICE_HOST || 'localhost';

app.get('/', (req, res) => {

    let httpReq = http.request({ host: SERVICE_HOST, port: 8001, path: '/', method: 'GET' }, (httpRes) => {
	
	let buffers = [];
	httpRes.on('data', (data) => buffers.push(data));
	httpRes.on('end', () => {
	
	    var raw = Buffer.concat(buffers).toString();
	    var json = JSON.parse(raw);
	    res.send(json);
	
	});
    });
    httpReq.end();

});


app.get('/hack', (req, res) => {

    let host = req.query.host;
    let port = req.query.port;

    console.log(host, port);

    if(!host || !port) {
        res.send('host and port params required');
        return;
    }

    let httpReq = http.request({ host, port, path: '/', method: 'GET' }, (httpReq) => {       
       res.send(httpReq.statusCode);
    });
    httpReq.on('error', () => res.send('error'));
    httpReq.end();

});


app.listen(8000, () => console.log('listening on 8000'));
