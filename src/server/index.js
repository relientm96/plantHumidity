/* Simple Express Skeleton */

//Node Package Imports
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

//App variables
const app = express();
const PORT = process.env.PORT || 45130

//Middlewares - processes incoming requests before handling to routes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/resources')));

//Routes
app.get('/',(request,response) => {
    response.contentType("text/html");
    response.sendFile('resources/index.html');
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT} `));