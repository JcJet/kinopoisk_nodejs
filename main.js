"use strict";
exports.__esModule = true;
var https = require("https");
var options = {
    hostname: 'api.kinopoisk.dev',
    path: 'v1//v1/movie/random',
    headers: {
        'X-API-KEY': 'VMK2ZR7-B8GMKR0-KSM54H7-CHNB9JM'
    }
};
https.get(options, function (resp) {
    var result = '';
    resp.on('data', function (chunk) {
        result += chunk;
    });
    resp.on('end', function () {
        console.log(result);
    });
});
