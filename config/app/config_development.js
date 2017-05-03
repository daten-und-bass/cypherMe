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
      // ip: process.env.DUNDB_APP_ENV_S2_WB1_IRME_IP1, // not used
      // http: {
      //   port: process.env.DUNDB_APP_ENV_S2_WB1_IRME_HTTP_PORT, // not used
      // },
      https: {
        port: process.env.DNB_N_NODEJS_OAI_HTTPS_PORT,
        // crt: '/etc/ssl/' + process.env.DNB_APP_ENV_S1_WB_FTED_HTTPS_CERT1,
        crt: process.env.DNB_ENV_V_SEC_PATH + '/' + process.env.DNB_ENV_APP_S1_WB_FTED_HTTPS_CERT1_PUB,
        // key: '/etc/ssl/' + process.env.DNB_APP_ENV_S1_WB_FTED_HTTPS_CERT1_KEY,
        key: process.env.DNB_ENV_V_SEC_PATH + '/' + process.env.DNB_ENV_APP_S1_WB_FTED_HTTPS_CERT1_KEY,
      },
      // not an ip ... maybe better hops .. change nginx ip settings (show real client ip)
      // proxies: [ process.env.DNB_INF1_ENV_S1_WF ],
    };

    return web;
  },
};

(function readPKIFiles() {
  // process.env.WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
  process.env.CYPHERME_WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
  // process.env.WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8');
  process.env.CYPHERME_WEB_HTTPS_CRT = fs.readFileSync(appConfig.web().https.crt, 'utf8');

  // fs.unlinkSync(appConfig.web().https.key)  
})();

module.exports = appConfig;
