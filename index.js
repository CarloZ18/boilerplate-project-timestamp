// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended: false}));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
const dateInUtc = /\d{4}-\d{2}-\d{2}/gm;
const dateInUnix=/\d{13}/gm

app.get("/api", function (req, res) {
 res.json({
      unix: Math.floor(new Date().getTime()),
      utc:new Date().toUTCString()
 })
});

app.get("/api/:date", function (req, res) {
  function isCorrectDate(date) {
    return date instanceof Date && isFinite(date);
}
    if (req.params.date.match(dateInUnix) !== null) {
    res.json({
      unix: Number(req.params.date),
      utc: new Date(Number((req.params.date))).toUTCString(),
    });
  } else if(req.params.date.match(dateInUtc) !== null ) {
    res.json({
      unix: Math.floor(new Date(req.params.date).getTime()),
      utc: new Date((req.params.date)).toUTCString(),
    });
  }else if(isCorrectDate(req.params.date) === false){
    res.json({
     error:"Invalid Date"
    })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
