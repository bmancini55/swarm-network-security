let http = require('http');
let express = require('express');

const ES_HOST = process.env.ES_HOST || 'localhost';

let app = express();

app.get('/', (req, res) => {

    let httpReq = http.request({ host: ES_HOST, port: 9200, path: '/', method: 'GET' }, (httpRes) => {

        let buffers = [];
        httpRes.on('data', (data) => buffers.push(data));
        httpRes.on('end', () => {
            
            let raw = Buffer.concat(buffers);
            let json = JSON.parse(raw);
            res.send(json);

        });
    
    });
    httpReq.end();

});

app.listen(8001, () => console.log('listening on 8001'));
