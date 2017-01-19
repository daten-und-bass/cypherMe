'use strict';

var htmlWebIndex = function (api, localesUtils) {
  var that = this;

  return {
    index: function(req, res) {
      var guessedLocale = req.acceptsLanguages(that.supportedLocales);

      if (guessedLocale) {
        var locales = localesUtils.setLocales(locale, guessedLocale, that.strings);
        var locale = guessedLocale;
        res.redirect('/' + guessedLocale);
      } else {
        var locales = localesUtils.setLocales(locale, that.defaultLocale, that.strings);
        var locale = that.defaultLocale;
        res.redirect(that.defaultLocale);
      }
    },

    index_locale: function(req, res) {
      var locales = localesUtils.setLocales(locale, req.swagger.params.locale.value, that.strings); 
      var locale = req.swagger.params.locale.value;

      res.render('index', 
        { locale: locale,
          localesMenu: locales.localesMenu,
          localesCommands: locales.localesCommands,
          localesStrings: locales.localesStrings,
      });
    },

    about: function(req, res) {
      var locales = localesUtils.setLocales(locale, req.swagger.params.lang.value, that.strings); 
      var locale = 'en';
      var lang = req.swagger.params.lang.value;

      res.render('service_pages/about', 
        { locale: locale,
          lang: lang,
          localesMenu: locales.localesMenu,
          localesCommands: locales.localesCommands,
          localesStrings: locales.localesStrings,
          about: 'about'
      });  
    },
  };
};

module.exports = htmlWebIndex;
