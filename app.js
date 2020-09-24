
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "75dc2fd92f0a5c7016da0be531a4f24f";
  const units = req.body.units;
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(apiURL, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<h1>The temperature in " + query + " is " + temp + " degrees fahrenheit.</h1>");
    res.write("<h3>The weather is currently " + description);
    res.write("<br><img src=" + iconURL + ">");
    res.send()
    })
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
