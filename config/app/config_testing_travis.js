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
      https: {
        port: process.env.DNB_NODE_OAI_HTTPS_PORT,
        crt: process.env.HOME + '/' + process.env.DNB_APP_ENV_S1_WB_FTED_HTTPS_CERT1,
        key: process.env.HOME + '/' + process.env.DNB_APP_ENV_S1_WB_FTED_HTTPS_CERT1_KEY,
      },
      // not an ip ... maybe better hops .. change nginx ip settings (show real client ip)
      // proxies: [ process.env.DNB_INF1_ENV_S1_WF ],
    };

    return web;
  },
};

(function readPKIFiles() {
  process.env.CYPHERME_WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
  process.env.CYPHERME_WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8'); 
})();

module.exports = appConfig;
