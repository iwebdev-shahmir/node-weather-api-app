const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({exrended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
console.log(req.body.cityName);

const city = req.body.cityName;
const apiKey = "30dac991fd8ae9d2bd274001e936d635";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey+ "&units=" + unit;

https.get(url, function(response) {
  console.log(response.statusCode);

  response.on("data", function(data) {
    // console.log(data);
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDec = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;

    const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<div style='text-align: center; margin-top:100px'> <p>the Temperature in "+ city + " is "+ temp + "</p>");
    res.write("<p>the weather of "+ city + "is " + weatherDec+ "</p>");
    res.write("<img src="+ imgUrl +"> </div>");
    res.send();

  });
});
});

app.listen(3000, function() {
  console.log("port 3000");
});
