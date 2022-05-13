const express = require('express')
const app = express()
const port = 3000;
const https = require("https");

// app.get('/', (req, res) => res.send('Hello World!'))
app.get("/", function (req, res) {
    res.send("server is live");
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Odintsovo&appid=bf4571a67aa57ec82fdd16233046cc8f&units=metric";
    https.get(url, function (response) {
        // console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            console.log("Current temperature is " + temp + ". " + weatherDesc);
        })

    });

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))