// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use('/', function (req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date_string?', function (req, res) {
  var date_string = req.params.date_string;
  date_string = isNaN(date_string) ? date_string : parseInt(date_string);

  var dateFormatValidate = /^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}/;

  //var date = date_string != null ? new Date(date_string) : new Date();
  // console.log(date_string != undefined);
  var date =
    date_string != null
      ? dateFormatValidate.test(date_string) || typeof date_string === 'number'
        ? new Date(date_string)
        : null
      : new Date();

  date != null
    ? console.log({ unix: date.getTime(), utc: date.toUTCString() })
    : console.log({ error: 'Invalid Date' });

  date != null
    ? res.send({ unix: date.getTime(), utc: date.toUTCString() })
    : res.send({ error: 'Invalid Date' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
