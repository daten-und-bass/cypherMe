'use strict';

var fs = require('fs');

var appConfig = {
  environment: function() {
    var environment = {
      name: process.env.NODE_ENV,
      // git: {
      //   commit: process.env.CYPHERME_WEB_REPO_HEAD,
      // },
    };
    return environment;
  },

  web: function() {
    var web = {
      https: {
        port: process.env.CYPHERME_WEB_HTTPS_PORT,
        pub: process.env.HOME + '/' + process.env.CYPHERME_WEB_HTTPS_CERT1_PUB_PATH,
        key: process.env.HOME + '/' + process.env.CYPHERME_WEB_HTTPS_CERT1_KEY_PATH,
      },
      proxies: isNaN(parseInt(process.env.CYPHERME_WEB_PROXIES)) ? false : parseInt(process.env.CYPHERME_WEB_PROXIES),
    };

    return web;
  },
};

(function readPKIFiles() {
  process.env.CYPHERME_WEB_HTTPS_KEY = fs.readFileSync(appConfig.web().https.key, 'utf8');
  process.env.CYPHERME_WEB_HTTPS_PUB = fs.readFileSync(appConfig.web().https.pub, 'utf8'); 
})();

module.exports = appConfig;
