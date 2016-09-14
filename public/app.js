'use strict';


function cypherMe(input) {
  var password = document.getElementById('password').value;
  var cypherElement = document.getElementById('cypher');
  var cypher = cypherElement.options[cypherElement.selectedIndex].text;
  var passwordNew = document.getElementById('passwordNew');
  var cypherUsed = document.getElementById('cypherUsed');

  passwordNew.value += password;
  cypherUsed.value += cypher;
  
  return false;
}

function cypherCaesarEncrypt(shift) {
  var passwordToEncrypt = document.getElementById('password').value;
  var passwordEncryped = cypherCaesar(passwordToEncrypt, shift);

  return passwordEncryped;
}

function cypherCaesarDecrypt(shift) {
  var shift = (26 - shift) % 26;
  var passwordEncrypted = document.getElementById('password').value;
  var passwordDecrypted = cypherCaesar(passwordEncrypted, shift);

  return passwordDecrypted;
}


function cypherCaesar(password, shift) {
  var cypherCaesarPassword = '';

  for (var i = 0; i < password.length; i++) {
    var currentCharacter = password.charCodeAt(i);

    switch(currentCharacter) {
      case (currentCharacter >= 65 && currentCharacter <=  90):
        cypherCaesarPassword += String.fromCharCode((currentCharacter - 65 + shift) % 26 + 65);  
        break;
      case (c >= 97 && c <= 122):
        cypherCaesarPassword += String.fromCharCode((currentCharacter - 97 + shift) % 26 + 97); 
        break;
      default:
        cypherCaesarPassword += password.charAt(i);
    }
  }

  return cypherCaesarPassword;
}


function cypherMorseEncrypt() {
  var passwordToEncrypt = document.getElementById('password').value.toLowerCase();
  var passwordEncryped = cypherMorseEncrypt(passwordToEncrypt);

  return passwordEncryped;
}

// function cypherMorse(password) {

// var charCodes=new Array(36); 
// var morseCode = {
//   'a': '. _',
//   'b': '_ . . .',
//   'c': '_ . _ .',
//   'd': '_ . .',
//   'e': '.',
//   'f': '. . _ .',
//   'g': '_ _ .',
//   'h': '. . . .',
//   'i': '. .',
//   'j': '. _ _ _',
//   'k': '_ . _',
//   'l': '. _ . .',
//   'm': '_ _',
//   'n': '_ .',
//   'o': '_ _ _',
//   'p': '. _ _ .',
//   'q': '_ _ . _',
//   'r': '. _ .',
//   's': '. . .',
//   't': '_',
//   'u': '. . _',
//   'v': '. . . _',
//   'w': '. _ _',
//   'x': '_ . . _',
//   'y': '_ . _ _',
//   'z': '_ _ . .',
//   '0': '_ _ _ _ _',
//   '1': '. _ _ _ _',
//   '2': '. . _ _ _',
//   '3': '. . . _ _',
//   '4': '. . . . _',
//   '5': '. . . . .',
//   '6': '_ . . . .',
//   '7': '_ _ . . .',
//   '8': '_ _ _ . .',
//   '9': '_ _ _ _ .',

// }





