/* Simple Express Skeleton */

//Node Package Imports
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

//App variables
const app = express();
const PORT = process.env.PORT || 45130

//CouchDB
const   nano          = require("nano")("http://SinsOnTwitter:group68@localhost:5984")
const   humidSensorDB = nano.db.use("humidity") 
const   tempSensorDB  = nano.db.use("temperature")

//Middlewares - processes incoming requests before handling to routes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/resources')));

//Routes
app.get('/',(request,response) => {
    response.contentType("text/html");
    response.sendFile('resources/index.html');
});

//Endpoint for ESP8266 to update sensor values
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

//FrontEnd gets humidity data from this endpoint
app.get('/api/data/humidity',(request,response) => {
    humidSensorDB.view("humidView","sortTime")
    .then((body) => {
        response.send(body.rows);
    })
    .catch((error) => {
        console.log("Promise rejected! Error was: " + error);
    });
});

//FrontEnd gets temperature data from this endpoint
app.get('/api/data/temperature',(request,response) => {
    tempSensorDB.view("tempView","sortTime")
    .then((body) => {
        response.send(body.rows);
    })
    .catch((error) => {
        console.log("Promise rejected! Error was: " + error);
    });
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT} `));