'use strict';

var express = require('express');
var path = require('path');
var https = require('https');

var helmet = require('helmet');
var forceSSL = require('express-force-ssl');

var exphbs  = require('express-handlebars');

var SwaggerExpress = require('swagger-express-mw');

var webConfig = require('./config/context').webConfig;

var app = express();

var httpsServer = https.createServer({key: process.env.CYPHERME_WEB_HTTPS_KEY, cert: process.env.CYPHERME_WEB_HTTPS_CRT}, app);
httpsServer.listen(webConfig.https.port);

app.set('trust proxy', webConfig.proxies);
app.set('trust proxy', 'loopback, 192.168.0.41');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    toJSON : function(object) {
      return JSON.stringify(object);
    },
  }
}));
app.set('view engine', 'handlebars');

app.set("forceSSLOptions", { httpsPort: webConfig.https.port });

app.use(helmet());
app.use(forceSSL);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

app.use(function clientErrorHandler(err, req, res, next) {
  if (req.xhr) { res.status(500).send({ error: 'Something failed!' }); } 
  else { next(err); }
});

app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  if (process.env.NODE_ENV === 'development') {
    res.render('error', { error: err });
  } else {
    res.render('error', { error: {message: err.message, status: err.status}});
  } 
});

var config = {
  appRoot: __dirname // required config
};



SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/']) {
    console.log('Site up in environment:' + process.env.NODE_ENV);
  }
});

module.exports = app;
