/* Simple Express Skeleton */

/**
 * NPM Module Imports
 */
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const request = require('request');
const morgan = require('morgan');

/**
 * App Variables
 */
const app = express();
const PORT = process.env.PORT || 45130

/**
 * CouchDB Variables
 */
const nano = require("nano")("http://SinsOnTwitter:group68@localhost:5984")
const humidSensorDB = nano.db.use("humidity")
const tempSensorDB = nano.db.use("temperature")

/**
 * Sensor URL Endpoints
 */
const MY_EXTERNAL_IP = "http://matthewhome.dnsalias.org:9140"; // NodeMCU linked to port 9140
const ESPURL = MY_EXTERNAL_IP;
const ESP_MARIO_URL = MY_EXTERNAL_IP + "/mario";
const ESP_PIRATES_URL = MY_EXTERNAL_IP + "/pirates";

/**
 * OpenWeatherMap API Variables
 */
const APIKEY = "d5fc87e05478be7b30ebf1e7105713e1";
const MELBOURNE_ID = "7839805";
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?id=" + MELBOURNE_ID + "&APPID=" + APIKEY;
const WEATHER_HOUR = "http://api.openweathermap.org/data/2.5/forecase/hourly?id=" + MELBOURNE_ID + "&APPID=" + APIKEY;

/**
 * App middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/resources')));
app.use(morgan('combined'));

/**
 * App route functions called from frontend
 */

/**
 * Serve root webpage
 */
app.get('/', (request, response) => {
    response.contentType("text/html");
    response.sendFile('resources/index.html');
});

/**
 * Receives data from sensor and update CouchDB database
 */
app.post('/api/data', function(request, response) {
    var humimdData = request.body.humidity.data;
    var tempData = request.body.temperature.data;
    console.log("Humidity data: " + humimdData);
    console.log("Temperature data: " + tempData);

    humidSensorDB.insert(request.body.humidity).then((body) => {
        console.log("Inserted " + body + " to humidity readings");
    })

    tempSensorDB.insert(request.body.humidity).then((body) => {
        console.log("Inserted " + body + " to temperature readings");
    })

    response.send("Acknowleged from server");
});

/**
 * FrontEnd call to get humidity data from CouchDB
 */
app.get('/api/data/humidity', (request, response) => {
    humidSensorDB.view("humidView", "sortTime")
        .then((body) => {
            response.send(body.rows);
        })
        .catch((error) => {
            console.log("Promise rejected! Error was: " + error);
        });
});

/**
 * FrontEnd call to get temperature data from CouchDB
 */
app.get('/api/data/temperature', (request, response) => {
    tempSensorDB.view("tempView", "sortTime")
        .then((body) => {
            response.send(body.rows);
        })
        .catch((error) => {
            console.log("Promise rejected! Error was: " + error);
        });
});

/**
 * FrontEnd call that re-routes request to sensor to play Mario
 */
app.post('/remote/mario', (req, res) => {

    //Make request to remote sensor
    request({
        url: ESP_MARIO_URL,
        method: 'POST',
    }, function(error, response, body) {
        if (error) {
            res.contentType("text/plain");
            res.send("Could not play mario...");
        } else {
            res.contentType("text/plain");
            res.send(response.body);
        }
    });

});

/**
 * FrontEnd call that re-routes request to sensor to play Pirates of the Carribean
 */
app.post('/remote/pirates', (req, res) => {
    //Make request to remote sensor
    request({
        url: ESP_PIRATES_URL,
        method: 'POST',
    }, function(error, response, body) {
        if (error) {
            res.contentType("text/plain");
            res.send("Could not play pirates...");
        } else {
            res.contentType("text/plain");
            res.send(response.body);
        }
    });
});

//Poll Weather data from openweatherapi
app.get("/api/data/getweatherdata", (req, res) => {
    //Make request to remote sensor
    request({
        url: WEATHER_URL,
        method: 'GET',
        json: true,
    }, function(error, response, body) {
        if (error) {
            res.contentType("application/json");
            res.send(response.body);
        } else {
            res.contentType("application/json");
            res.send(body.main);
        }
    });
});

//Poll Weather data from openweatherapi
app.get("/api/data/getweatherdata/hourly", (req, res) => {
    //Make request to remote sensor
    request({
        url: WEATHER_HOUR,
        method: 'GET',
        json: true,
    }, function(error, response, body) {
        if (error) {
            res.contentType("application/json");
            res.send(response.body);
        } else {
            console.log(body);
            res.contentType("application/json");
            res.send(body);
        }
    });
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT} `));