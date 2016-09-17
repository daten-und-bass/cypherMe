'use strict';

function cypherMe() {
  var password = document.getElementById('password').value;
  var cypherElement = document.getElementById('cypher');
  var cypher = cypherElement.options[cypherElement.selectedIndex];
  var shift = document.getElementById('shift').value;
  var passwordEncrypted = document.getElementById('passwordEncrypted');
  var cypherUsed = document.getElementById('cypherUsed');
  var repeater = document.getElementById('repeater').value;

  switch(cypher.value) {
    case ('caesar'):
      passwordEncrypted.value = Array(1 + parseInt(repeater)).join(cypherMeCaesarEncrypt(password, shift));
      cypherUsed.value = cypher.text + ' ' + shift + ' (Repeater: ' + repeater + ')';
      break;
    case ('reverse'):
      passwordEncrypted.value = Array(1 + parseInt(repeater)).join(cypherMeReverse(password));
      cypherUsed.value = cypher.text + ' (Repeater: ' + repeater + ')';
      break;
    case ('reverseCase'):
      passwordEncrypted.value = Array(1 + parseInt(repeater)).join(cypherMeReverseCase(password));
      cypherUsed.value = cypher.text + ' (Repeater: ' + repeater + ')';
      break;
    case ('vigenere'):
      break;
    default:
      console.log('Default case');
  } 
  
  return false;
}

function deCypherMe() {
  var passwordToDecrypt = document.getElementById('passwordToDecrypt').value;
  var cypherElementToDecrypt = document.getElementById('cypherToDecrypt');
  var cypherToDecrypt = cypherElementToDecrypt.options[cypherElementToDecrypt.selectedIndex];
  var shiftToDecrypt = document.getElementById('shiftToDecrypt').value;
  var passwordDecrypted = document.getElementById('passwordDecrypted');
  var cypherUsedToDecrypt = document.getElementById('cypherUsedToDecrypt');
  var repeaterToDecrypt = document.getElementById('repeaterToDecrypt').value;

  var passwordLength = parseInt(passwordToDecrypt.length) / parseInt(repeaterToDecrypt)
  var re = new RegExp ('.{1,' + parseInt(passwordLength) + '}', 'g');

  switch(cypherToDecrypt.value) {
    case ('caesar'):
      passwordDecrypted.value = cypherMeCaesarDecrypt(passwordToDecrypt.match(re)[0], shiftToDecrypt);
      cypherUsedToDecrypt.value = cypherToDecrypt.text + ' ' + shiftToDecrypt + ' (Repeater: ' + repeaterToDecrypt + ')';
      break;
    case ('reverse'):
      passwordDecrypted.value = cypherMeReverse(passwordToDecrypt.match(re)[0]);
      cypherUsedToDecrypt.value = cypherToDecrypt.text + ' (Repeater: ' + repeaterToDecrypt + ')';
      break;
    case ('reverseCase'):
      passwordDecrypted.value = cypherMeReverseCase(passwordToDecrypt.match(re)[0]);
      cypherUsedToDecrypt.value = cypherToDecrypt.text + ' (Repeater: ' + repeaterToDecrypt + ')';
      break;
    case ('vigenere'):
      break;
    default:
      console.log('Default case');
  }

  return false;
}

function cypherMeCaesarEncrypt(passwordToEncrypt, shift) {
  var passwordEncryped = cypherMeCaesar(passwordToEncrypt, shift);

  return passwordEncryped;
}

function cypherMeCaesarDecrypt(passwordToDecrypt, shift) {
  var shiftBack = (26 - parseInt(shift)) % 26;
  var passwordDecrypted = cypherMeCaesar(passwordToDecrypt, shiftBack);

  return passwordDecrypted;
}


function cypherMeCaesar(password, shift) {
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


function cypherMeReverse(password) {
  var passwordEnOrDecrypted = "";

  for (var i = password.length - 1; i >= 0; i--) {
      passwordEnOrDecrypted += password[i];
  }
  return passwordEnOrDecrypted;
}

function cypherMeReverseCase(password) {
  var passwordEnOrDecrypted = "";

  for (var i = password.length - 1; i >= 0; i--) {
    var currentCharacter = password.charCodeAt(i);
    
    switch(true) {
      case (currentCharacter >= 65 && currentCharacter <=  90): 
        passwordEnOrDecrypted += password[i].toLowerCase();
        break;
      case (currentCharacter >= 97 && currentCharacter <= 122):
        passwordEnOrDecrypted += password[i].toUpperCase();
        break;
      default:
        passwordEnOrDecrypted += password[i];
    }
  }

  return passwordEnOrDecrypted;
}
function toggleView() {

  var cypherElement = document.getElementById('cypher');
  var cypher = cypherElement.options[cypherElement.selectedIndex].value;

  switch(cypher) {
    case ('caesar'): 
      document.getElementById('shift').style.display = 'inline';
      document.getElementById('shiftLabel').style.display = 'inline';
      break;
    default:
      document.getElementById('shift').style.display = 'none';
      document.getElementById('shiftLabel').style.display = 'none';
  }
}

function toggleViewToDecrypt() {

  var cypherElement = document.getElementById('cypherToDecrypt');
  var cypherToDecrypt = cypherElement.options[cypherElement.selectedIndex].value;

  switch(cypherToDecrypt) {
    case ('caesar'): 
      document.getElementById('shiftToDecrypt').style.display = 'inline';
      document.getElementById('shiftToDecryptLabel').style.display = 'inline';
      break;
    default:
      document.getElementById('shiftToDecrypt').style.display = 'none';
      document.getElementById('shiftToDecryptLabel').style.display = 'none';
  }
}



