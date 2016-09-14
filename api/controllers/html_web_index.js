'use strict';

var htmlWebIndex = function (api, localesUtils) {
  var that = this;

  var locale = localesUtils.getDefaultLocale(); 
  var locales = localesUtils.setLocales('noLocale', locale, that.strings);

  return {
    index: function(req, res) {
      var guessedLocale = req.acceptsLanguages(that.supportedLocales);

      if (guessedLocale) {
        res.redirect('/' + guessedLocale);
      } else {
        res.redirect(that.defaultLocale);
      }
    },

    index_locale: function(req, res) {
      locales = localesUtils.setLocales(locale, req.swagger.params.locale.value, that.strings); 
      locale = req.swagger.params.locale.value;

      res.render('index', 
        { locale: locale,
          localesMenu: locales.localesMenu,
          localesCommands: locales.localesCommands,
          localesStrings: locales.localesStrings,
      });
    },

    // about: function(req, res) {
    //   locales = localesUtils.setLocales(locale, req.swagger.params.locale.value, that.strings); 
    //   locale = req.swagger.params.locale.value;

    //   res.render('service_pages/about', 
    //     { locale: locale,
    //       localesMenu: locales.localesMenu,
    //       localesCommands: locales.localesCommands,
    //   });  
    // },

    // contact: function(req, res) {
    //   locales = localesUtils.setLocales(locale, req.swagger.params.locale.value, that.strings); 
    //   locale = req.swagger.params.locale.value;

    //   res.render('service_pages/contact', 
    //     { locale: locale,
    //       localesMenu: locales.localesMenu,
    //       localesCommands: locales.localesCommands,
    //   });  
    // },
    
    // imprint: function(req, res) {
    //   locales = localesUtils.setLocales(locale, req.swagger.params.locale.value, that.strings); 
    //   locale = req.swagger.params.locale.value;

    //   res.render('service_pages/imprint', 
    //     { locale: locale,
    //       localesMenu: locales.localesMenu,
    //       localesCommands: locales.localesCommands,
    //   });  
    // },
  };
};

module.exports = htmlWebIndex;
