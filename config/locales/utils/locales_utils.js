'use strict';

var locales = {};

function filterStrings (locale, defaultLocale, stringsToFilter) {
  var filteredStrings = {};
  for (var key1 in stringsToFilter ) {
    for(var key2 in stringsToFilter[key1]) {
      if(key2 === locale) {
        filteredStrings[key1] = (!stringsToFilter[key1][locale] || !stringsToFilter[key1][locale][locale.toUpperCase()]) ? stringsToFilter[key1][defaultLocale][defaultLocale.toUpperCase()] : stringsToFilter[key1][locale][locale.toUpperCase()];
      } else if(!stringsToFilter[key1][locale]) {
        filteredStrings[key1] = stringsToFilter[key1][defaultLocale][defaultLocale.toUpperCase()];
      }
    }
  }

  return filteredStrings;
}

var localesUtils = function () {
  var that = this;

  var localesMenu = {
    de: filterStrings(this.supportedLocales[0], this.defaultLocale, this.menu),
    en: filterStrings(this.supportedLocales[1], this.defaultLocale, this.menu),
    es: filterStrings(this.supportedLocales[2], this.defaultLocale, this.menu),
    fr: filterStrings(this.supportedLocales[3], this.defaultLocale, this.menu),
  };
  var localesCommands = {
    de: filterStrings(this.supportedLocales[0], this.defaultLocale, this.commands),
    en: filterStrings(this.supportedLocales[1], this.defaultLocale, this.commands),
    es: filterStrings(this.supportedLocales[2], this.defaultLocale, this.commands),
    fr: filterStrings(this.supportedLocales[3], this.defaultLocale, this.commands),
  };
  // var localesUnits = {
    //   de: filterStrings(this.supportedLocales[0], localesUnits),
    //   en: filterStrings(this.supportedLocales[1], localesUnits),
    //   es: filterStrings(this.supportedLocales[2], localesUnits),
    //   fr: filterStrings(this.supportedLocales[3], localesUnits),
  // };
  var localesStringsApp = {
    de: filterStrings(this.supportedLocales[0], this.defaultLocale, this.app),
    en: filterStrings(this.supportedLocales[1], this.defaultLocale, this.app),
    es: filterStrings(this.supportedLocales[2], this.defaultLocale, this.app),
    fr: filterStrings(this.supportedLocales[3], this.defaultLocale, this.app),
  };

  return {
    getDefaultLocale: function () {
      return that.defaultLocale;
    },
    setLocales: function (locale, localeOfCurrentReq, localesStrings) {
      
      if (locale !== localeOfCurrentReq) {
        locales = {};
        locales.defaultLocale = that.defaultLocale;
        locales.locale = localeOfCurrentReq;
        locales.localesMenu = localesMenu[localeOfCurrentReq];
        locales.localesCommands = localesCommands[localeOfCurrentReq];
      } 
 
      switch (localesStrings['id'][that.defaultLocale][that.defaultLocale.toUpperCase()]) {
        case 'localesStringsApp':
          locales.localesStrings = localesStringsApp[localeOfCurrentReq];
          break;
        default:
          console.log('Default case.');
      }

      return locales;
    },
  };
};

module.exports = localesUtils;
