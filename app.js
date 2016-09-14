'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var path = require('path');

var https = require('https');
var helmet = require('helmet');
var forceSSL = require('express-force-ssl');
var app_config = require('./config/app');
var exphbs  = require('express-handlebars');

var config = {
  appRoot: __dirname // required config
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('trust proxy', 'loopback, 192.168.0.41');

app.use(helmet());
app.set("forceSSLOptions", { httpsPort: app_config.web().https.port });
app.use(forceSSL);

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

var httpsServer = https.createServer({key: process.env.WEB_HTTPS_KEY, cert: process.env.WEB_HTTPS_CRT}, app);
httpsServer.listen(app_config.web().https.port);

module.exports = app; // for testing
