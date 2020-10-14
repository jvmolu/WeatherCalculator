const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res){
  var city = req.body.city;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=5625423ce867f8914b954edf3ac8a084&units=metric";
  https.get(url, function(response){
    // console.log(response);
    response.on('data',function(data){
      var weatherData = JSON.parse(data);
      res.write("<p>Weather condition is currently: "+weatherData.weather[0].description +"</p>");
      res.write("<h1>The temperature in "+city+" is "+weatherData.main.temp+" degree Celcius.<h1>");
      res.write("<img src = http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png alt = 'oops!'>");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server running at 3000");
});
