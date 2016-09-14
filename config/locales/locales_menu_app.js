'use strict';

var today = new Date();
var year = today.getFullYear();

var localesMenuApp = {
  'cypherMe': {
    'de': {'DE': 'cypherMe'},
    'en': {'EN': 'cypherMe'},
    'es': {'ES': 'cypherMe'},
    'fr': {'FR': 'cypherMe'},
  },
  'Current Year YYYY': {
    'de': {'DE': year},
    'en': {'EN': year},
    'es': {'ES': year},
    'fr': {'FR': year},
  },
  'Menu': {
    'de': {'DE': 'Menü'},
    'en': {'EN': 'Menu'},
    'es': {'ES': 'menú'},
    'fr': {'FR': 'Menu'},
  },
  'Home': {
    'de': {'DE': 'Start'},
    'en': {'EN': 'Home'},
    'es': {'ES': 'Portada'},
    'fr': {'FR': 'Accueil'},
  },
  'About': {
    'de': {'DE': 'Über uns'},
    'en': {'EN': 'About'},
    'es': {'ES': 'Acerca'},
    'fr': {'FR': 'À propos'}, 
  },
  'Imprint': {
    'de': {'DE': 'Impressum'},
    'en': {'EN': 'Imprint'},
    'es': {'ES': 'Información Legal'},
    'fr': {'FR': 'Mentions Légales'}, 
  },
  'Contact': {
    'de': {'DE': 'Kontakt'},
    'en': {'EN': 'Contact'},
    'es': {'ES': 'Contacto'},
    'fr': {'FR': 'Contact'}, 
  },
  'Github Code': {
    'de': {'DE': 'Github Code'},
    'en': {'EN': 'Github Code'},
    'es': {'ES': 'Github Code'},
    'fr': {'FR': 'Github Code'}, 
  },
  'Login': {
    'de': {'DE': 'Login'},
    'en': {'EN': 'Login'},
    'es': {'ES': 'Acceder'},
    'fr': {'FR': 'Se connecter'}, 
  },
  'Users': {
    'de': {'DE': 'Nutzer'},
    'en': {'EN': 'Users'},
    'es': {'ES': 'Usuarios'},
    'fr': {'FR': 'Cybernautes'},
  },
  'Developers': {
    'de': {'DE': 'Entwickler'},
    'en': {'EN': 'Developers'},
    'es': {'ES': 'Productores'},
    'fr': {'FR': 'Développeurs'},
  },
};

module.exports = localesMenuApp;