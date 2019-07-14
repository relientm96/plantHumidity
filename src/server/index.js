/* Simple Express Skeleton */

/**
 * NPM Module Imports
 */
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const request = require('request');

/**
 * App Variables
 */
const app = express();
const PORT = process.env.PORT || 45130

/**
 * CouchDB Variables
 */
const   nano          = require("nano")("http://SinsOnTwitter:group68@localhost:5984")
const   humidSensorDB = nano.db.use("humidity") 
const   tempSensorDB  = nano.db.use("temperature")

/**
 * Sensor URL Endpoints
 */
const ESPURL           = "http://147.10.68.24:9140/";
const ESP_MARIO_URL    = "http://147.10.68.24:9140/mario";
const ESP_PIRATES_URL  = "http://147.10.68.24:9140/pirates";

/**
 * App middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/resources')));

/**
 * App route functions called from frontend
 */

/**
 * Serve root webpage
 */
app.get('/',(request,response) => {
    response.contentType("text/html");
    response.sendFile('resources/index.html');
});

/**
 * Receives data from sensor and update CouchDB database
 */
app.post('/api/data',function(request,response){
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
app.get('/api/data/humidity',(request,response) => {
    humidSensorDB.view("humidView","sortTime")
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
app.get('/api/data/temperature',(request,response) => {
    tempSensorDB.view("tempView","sortTime")
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
app.post('/remote/mario',(req,res) =>{
    //Make request to remote sensor
    request({
        url: ESP_MARIO_URL,
        method: 'POST',
    }, function (error, response, getData) {
        if (!error) {
            console.log(response.body);
        }
        else{
            console.log("[Error at [app.post('/remote/mario')]:" + error);
        }
    });
    res.contentType("text/plain");
    res.send("Playing Mario!");
});

/**
 * FrontEnd call that re-routes request to sensor to play Pirates of the Carribean
 */
app.post('/remote/pirates',(req,res) =>{
    //Make request to remote sensor
    request({
        url: ESP_PIRATES_URL,
        method: 'POST',
    }, function (error, response, getData) {
        if (!error) {
            console.log(response.body);
        }
        else{
            console.log("[Error at [app.post('/remote/pirates')]:" + error);
        }
    });
    res.contentType("text/plain");
    res.send("Playing Pirates!");
});

//Poll Weather data from openweatherapi
app.get("/api/data/getweatherdata",(request,response) => {

});

app.listen(PORT, () => console.log(`Server Started on port ${PORT} `));