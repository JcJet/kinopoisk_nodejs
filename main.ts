const https = require('https')
const fs = require('fs')

//Get your API_KEY: https://api.kinopoisk.dev/v1/documentation
const KINOPOISK_API_KEY = ''

function saveRandomMovie() {
    const options = {
        hostname: 'api.kinopoisk.dev',
        path: '/v1/movie/random',
        headers: {
            'X-API-KEY': KINOPOISK_API_KEY
        }
    }
    https.get(options, (resp) => {
        var result = ''
        resp.on('data', function (chunk) {
            result += chunk;
        });

        resp.on('end', function () {
            console.log(result);
            var json = JSON.parse(result);
            const filename = json.id;
            fs.writeFile(`./movies_json/${filename}.json`, result, 'utf-8', () => {
            })
        })
    })
}

function saveMoviesPerYear(year = '2020', page = 1) {
    const options = {
        hostname: 'api.kinopoisk.dev',
        // all fields. without these, there are not enough fields in this request.
        path: '/v1/movie?selectFields=id&selectFields=externalId&selectFields=name&selectFields=alternativeName&' +
            'selectFields=enName&selectFields=names&selectFields=type&selectFields=typeNumber&selectFields=year&' +
            'selectFields=description&selectFields=shortDescription&selectFields=slogan&selectFields=status&' +
            'selectFields=rating&selectFields=votes&selectFields=movieLength&selectFields=ratingMpaa&' +
            'selectFields=ageRating&selectFields=logo&selectFields=poster&selectFields=backdrop&' +
            'selectFields=videos&selectFields=genres&selectFields=countries&selectFields=persons&' +
            'selectFields=reviewInfo&selectFields=seasonsInfo&selectFields=budget&selectFields=fees&' +
            'selectFields=premiere&selectFields=similarMovies&selectFields=sequelsAndPrequels&' +
            'selectFields=watchability&selectFields=releaseYears&selectFields=top10&selectFields=top250&' +
            `selectFields=facts&selectFields=imagesInfo&selectFields=productionCompanies&page=${page}&limit=1000&year=${year}`,
        headers: {
            'X-API-KEY': 'VMK2ZR7-B8GMKR0-KSM54H7-CHNB9JM'
        }
    }
    https.get(options, (resp) => {
        var result = ''
        resp.on('data', function (chunk) {
            result += chunk;
        });

        resp.on('end', function () {
            //console.log(result);
            const json = JSON.parse(result);
            saveMoviesFromPage(json)
        })

        resp.on('error', function (err) {
            console.log('ERROR: ', err);
        })
    })
}

function saveMoviesFromPage(json) {
    for (let movie of json.docs) {
        const filename = movie.id
        fs.writeFileSync(`./movies_json/${filename}.json`, JSON.stringify(movie), 'utf-8', () => {
        })
    }
}

for (let i = 2000; i < 2025; i++){
    saveMoviesPerYear(i.toString());
}


//let file = fs.readFileSync('./movies_json/undefined.json');
//let json = JSON.parse(file)
//saveMoviesFromPage(json);
//console.log(json)
//console.log(json.docs[2])