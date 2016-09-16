'use strict';

function cypherMe() {
  var passwordToEncrypt = document.getElementById('password').value;
  var cypherElement = document.getElementById('cypher');
  var cypher = cypherElement.options[cypherElement.selectedIndex].text;
  var shift = document.getElementById('shift').value;
  var passwordNew = document.getElementById('passwordNew');
  var cypherUsed = document.getElementById('cypherUsed');
  var repeater = document.getElementById('repeater').value;

  switch(cypher) {
    case ('Caesar'):
      passwordNew.value = Array(1 + parseInt(repeater)).join(cypherCaesarEncrypt(passwordToEncrypt, shift));
      cypherUsed.value = cypher + ' ' + shift + ' (Repeater: ' + repeater + ')';
      break;
    case ('other'):
      break;
    default:
      console.log('Default case');
  
  return false;
  }
}

function deCypherMe() {
  var passwordToDecrypt = document.getElementById('passwordToDecrypt').value;
  var cypherElementToDecrypt = document.getElementById('cypherToDecrypt');
  var cypherToDecrypt = cypherElementToDecrypt.options[cypherElementToDecrypt.selectedIndex].text;
  var shiftToDecrypt = document.getElementById('shiftToDecrypt').value;
  var passwordDecrypted = document.getElementById('passwordDecrypted');
  var cypherUsedToDecrypt = document.getElementById('cypherUsedToDecrypt');
  var repeaterToDecrypt = document.getElementById('repeaterToDecrypt').value;

  var passwordLength = parseInt(passwordToDecrypt.length) / parseInt(repeaterToDecrypt)

  switch(cypherToDecrypt) {
    case ('Caesar'):
      var re = new RegExp ('.{1,' + parseInt(passwordLength) + '}', 'g');
      passwordDecrypted.value = cypherCaesarDecrypt(passwordToDecrypt.match(re)[0], shiftToDecrypt);
      cypherUsedToDecrypt.value = cypherToDecrypt + ' ' + shiftToDecrypt + ' (Repeater: ' + repeaterToDecrypt + ')';
      break;
    case ('other'):
      break;
    default:
      console.log('Default case');
  
  return false;
  }
}

function cypherCaesarEncrypt(passwordToEncrypt, shift) {
  var passwordEncryped = cypherCaesar(passwordToEncrypt, shift);

  return passwordEncryped;
}

function cypherCaesarDecrypt(passwordToDecrypt, shift) {
  var shiftBack = (26 - parseInt(shift)) % 26;
  var passwordDecrypted = cypherCaesar(passwordToDecrypt, shiftBack);

  return passwordDecrypted;
}


function cypherCaesar(password, shift) {
  var cypherCaesarPassword = '';

  for (var i = 0; i < password.length; i++) {
    var currentCharacter = password.charCodeAt(i);
    
    switch(true) {
      case (currentCharacter >= 65 && currentCharacter <=  90):
        cypherCaesarPassword += String.fromCharCode((parseInt(currentCharacter) - 65 + parseInt(shift)) % 26 + 65);  
        break;
      case (currentCharacter >= 97 && currentCharacter <= 122):
        cypherCaesarPassword += String.fromCharCode((parseInt(currentCharacter) - 97 + parseInt(shift)) % 26 + 97);
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





