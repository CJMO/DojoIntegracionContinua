var express = require('express');
var CodeBreaker = require('./main');

var app = express();
// Para despliegue en Heroku
app.set('port', (process.env.PORT || 3000));

app.get('/setsecret/:secret', function(req, res){
  number = req.params.secret;
  CodeBreaker.setSecret(number);
  res.send({message:'Ok, let the game begin'});
});

app.get('/guess/:number', function(req, res){
  number = req.params.number;
  res.send({result: CodeBreaker.codeBreaker(number)});
});

app.listen( app.get('port'), function(){
  console.log('NodeJs app listening on port ', app.get('port'));
} );

// exportar módulo para levantar la aplicación en test.js
module.exports = app;
