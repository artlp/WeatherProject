const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000;
const https = require("https");
const url = require('url');

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => res.send('Hello World!'))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    app.post("/", function (req, res) {
        const query = req.body.cityName;
        const appid = "bf4571a67aa57ec82fdd16233046cc8f";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=metric";
        https.get(url, function (response) {
            // console.log(response.statusCode);
            response.on("data", function (data) {
                const weatherData = JSON.parse(data);
                // console.log(weatherData);
                const temp = weatherData.main.temp;
                const weatherDesc = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const newUrl = new URL('https://openweathermap.org/img/wn/' + icon + '.png');
                res.write("<h1> Welcome to the new generation of weather service</h1>");
                res.write("<h2>Current temperature in " + query + " is " + temp + ". The weather is currently " + weatherDesc + ".</h2>");
                res.write("<img src=" + `${newUrl}` + ">");
                res.end();
            });
        });
            });
        });

        // });

        // });
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))