// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();



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
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  const dateInUnix = /\d{13}/gm;
  const isValidDate = function (date) {
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
  };
  if (
    isValidDate(req.params.date) === true ||
    req.params.date.match(dateInUnix) !== null
  ) {
    req.params.date.match(dateInUnix) !== null
      ? res.json({
          unix: Number(req.params.date),
          utc: new Date(Number(req.params.date)).toUTCString(),
        })
      : res.json({
          unix: Math.floor(new Date(req.params.date).getTime()),
          utc: new Date(req.params.date).toUTCString(),
        });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
