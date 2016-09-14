'use strict';

var fs = require('fs');

var appConfig = {
  environment: function() {
    var environment = {
      name: process.env.NODE_ENV,
    };
    return environment;
  },

  web: function() {
    var web = {
      ip: process.env.DUNDB_APP_ENV_S2_WB1_IRME_IP1, // not used
      http: {
        port: process.env.DUNDB_APP_ENV_S2_WB1_IRME_HTTP_PORT, // not used
      },
      https: {
        port: process.env.DUNDB_APP_ENV_S2_WB1_IRME_HTTPS_PORT,
        crt: '/etc/ssl/' + process.env.DUNDB_APP_ENV_S2_WB1_IRME_HTTPS_CERT1,
        key: '/etc/ssl/' + process.env.DUNDB_APP_ENV_S2_WB1_IRME_HTTPS_CERT1_KEY,
      },
    };

    return web;
  },
};

// (function loadOtherFiles () {
//   process.env.WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
//   // process.env.FLIXNET_WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
//   process.env.WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8');
//   // process.env.FLIXNET_WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8');

//   fs.unlinkSync(appConfig.web().https.key)  
// })();

module.exports = appConfig;
