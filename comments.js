//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//var commentsFile = 'comments.json';
var commentsFile = 'comments.txt';
var port = 3000;

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up the path for the static files
app.use(express.static(__dirname + '/public'));

//Set up the path for the node modules
app.use('/scripts', express.static(__dirname + '/node_modules/'));

//GET
app.get('/comments', function(req, res) {
  console.log('GET: /comments');
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

//POST
app.post('/comments', function(req, res) {
  console.log('POST: /comments');
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),