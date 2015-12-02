var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  var content = {};
  content.title = "GET Request Received";

  var params = [];
  for (var p in req.query){
    params.push({'name':p,'value':req.query[p]})
  }
  console.log("GET");
  console.log(req);
  console.log(params);
  content.dataList = params;
  res.render('home', content);
});

app.get('/app',function(req,res){

  res.render('app');
});

app.post('/', function(req, res){
  var content = {}
  content.title = "POST Request Received";
  var params = [];
  for (var p in req.body){
    params.push({'name':p,'value':req.body[p]})
  }
  console.log("POST");
  console.log(req.body);
  console.log(params);
  content.dataList = params;
  res.render('home', content);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
