/* Simple Express Skeleton */
 
const express = require('express');
const app = express();

const PORT = process.env.PORT || 45130

app.get('/',(request,response) => {
    response.send('<h1> Hello World </h1>');
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT} `));