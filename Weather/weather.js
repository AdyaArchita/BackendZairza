const http = require('http');
const https = require('https');
const url = require('url');

const apiKey = 'b5e08ee9afa6c95572b64536e08ab5e9';

function getWeatherData(city, callback) {
    const options = {
        hostname: 'api.openweathermap.org',
        path: `/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                callback(null, JSON.parse(data));
            } else {
                callback(new Error(`Failed to retrieve weather data. Status code: ${res.statusCode}`));
            }
        });
    });

    req.on('error', (error) => {
        callback(error);
    });

    req.end();
}

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/weather')) {
        const urlParts = req.url.split('?');
        if (urlParts.length === 2) {
            const queryParams = urlParts[1].split('&');
            let city = null;

            queryParams.forEach((param) => {
                if (param.startsWith('city=')) {
                    city = param.substring(5);
                }
            });

            if (city !== null) {
                getWeatherData(city, (error, data) => {
                    if (error) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Failed to retrieve weather data' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(data));
                    }
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'City query parameter is required' }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'City query parameter is required' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
