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
      proxies: [ process.env.DUNDB_INF1_ENV_S1_WF1_FTED_IP1, process.env.DUNDB_APP_ENV_S1_LB1_FTED_IP1 ],
    };

    return web;
  },
};

(function readPKIFiles() {
  // process.env.WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
  // process.env.CYPHERME_WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
  // process.env.WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8');
  // process.env.CYPHERME_WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8');

  // fs.unlinkSync(appConfig.web().https.key)  
})();

module.exports = appConfig;
