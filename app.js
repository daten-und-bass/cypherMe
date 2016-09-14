'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var path = require('path');
var exphbs  = require('express-handlebars');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/']) {
    console.log('Site up');
  }
});
