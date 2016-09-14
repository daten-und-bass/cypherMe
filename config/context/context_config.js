'use strict';

var api = require('yamljs').load('api/swagger/swagger.yaml');

var webConfig = require('../app').web();

var localesMenuApp = require('../locales/locales_menu_app');
var localesCommandsApp = require('../locales/locales_commands_app');
var localesUnitsApp = {};
var localesStringsApp = require('../locales/locales_strings_app');

var context = {
  index: {
    supportedLocales: ['de', 'en', 'es', 'fr'], 
    defaultLocale: 'en',
    strings: localesStringsApp,
  },
};

var localesUnfiltered = {
  defaultLocale: context.index.defaultLocale,
  supportedLocales: context.index.supportedLocales,
  menu: localesMenuApp,
  commands: localesCommandsApp,
  units: localesUnitsApp,
  app: localesStringsApp,
};

var localesUtils = require('../locales/utils/locales_utils')
                     .call(localesUnfiltered);

var context_html_web_index = require('../../api/controllers/html_web_index')
                               .call(context.index, api, localesUtils);


module.exports = {
  context_html_web_index: context_html_web_index,
};

