'use strict';

var cypherMeApp = (function () {

  function cypherMe() {
    var password = document.getElementById('password').value.trim();
    var cypherElement = document.getElementById('cypher');
    var cypher = cypherElement.options[cypherElement.selectedIndex];
    var shiftLabel = document.getElementById('shiftLabel').textContent;
    var shift = document.getElementById('shift').value;
    var keywordLabel = document.getElementById('keywordLabel').textContent;
    var keyword = document.getElementById('keyword').value.trim();
    var passwordEncrypted = document.getElementById('passwordEncrypted');
    var cypherUsed = document.getElementById('cypherUsed');
    var repeaterLabel = document.getElementById('repeaterLabel').textContent;
    var repeater = document.getElementById('repeater').value;

    switch(cypher.value) {
      case ('caesar'):
        passwordEncrypted.value = repeatPassword(cypherMeCaesarEncrypt(password, shift), parseInt(repeater))
        cypherUsed.value = cypher.text + ' (' + shiftLabel + ' ' + shift + ', ' + repeaterLabel + ' ' + repeater + ')';
        break;
      case ('reverse'):
        passwordEncrypted.value = repeatPassword(cypherMeReverse(password), parseInt(repeater));
        cypherUsed.value = cypher.text + ' (' + repeaterLabel + ' ' + repeater + ')';
        break;
      case ('reverseCase'):
        passwordEncrypted.value = repeatPassword(cypherMeReverseCase(password), parseInt(repeater));
        cypherUsed.value = cypher.text + ' (' + repeaterLabel + ' ' + repeater + ')';
        break;
      case ('vigenere'):
        passwordEncrypted.value = repeatPassword(cypherMeViginereEncrypt(password, keyword), parseInt(repeater));
        cypherUsed.value = cypher.text + ' (' + keywordLabel + ' ' + String.fromCharCode.apply(null, cypherMeViginereFilter(keyword)) + ', ' + repeaterLabel + ' ' + repeater + ')';
        break;
      default:
        console.log('Default case');
    } 
    
    return false;
  }

  function deCypherMe() {
    var passwordToDecrypt = document.getElementById('passwordToDecrypt').value.trim();
    var cypherElementToDecrypt = document.getElementById('cypherToDecrypt');
    var cypherToDecrypt = cypherElementToDecrypt.options[cypherElementToDecrypt.selectedIndex];
    var shiftLabelToDecrypt = document.getElementById('shiftLabelToDecrypt').textContent;
    var shiftToDecrypt = document.getElementById('shiftToDecrypt').value;
    var keywordLabelToDecrypt = document.getElementById('keywordLabelToDecrypt').textContent;
    var keywordToDecrypt = document.getElementById('keywordToDecrypt').value.trim();
    var passwordDecrypted = document.getElementById('passwordDecrypted');
    var cypherUsedToDecrypt = document.getElementById('cypherUsedToDecrypt');
    var repeaterToDecryptLabel = document.getElementById('repeaterToDecryptLabel').textContent;
    var repeaterToDecrypt = document.getElementById('repeaterToDecrypt').value;

    switch(cypherToDecrypt.value) {
      case ('caesar'):
        passwordDecrypted.value = cypherMeCaesarDecrypt(dividePassword(passwordToDecrypt, repeaterToDecrypt), shiftToDecrypt);
        cypherUsedToDecrypt.value = cypherToDecrypt.text + ' (' + shiftLabelToDecrypt + ' ' + shiftToDecrypt + ', ' + repeaterToDecryptLabel + ' ' + repeaterToDecrypt + ')';
        break;
      case ('reverse'):
        passwordDecrypted.value = cypherMeReverse(dividePassword(passwordToDecrypt, repeaterToDecrypt));
        cypherUsedToDecrypt.value = cypherToDecrypt.text + ' (' + repeaterToDecryptLabel + ' ' + repeaterToDecrypt + ')';
        break;
      case ('reverseCase'):
        passwordDecrypted.value = cypherMeReverseCase(dividePassword(passwordToDecrypt, repeaterToDecrypt));
         cypherUsedToDecrypt.value = cypherToDecrypt.text + ' (' + repeaterToDecryptLabel + ' ' + repeaterToDecrypt + ')';
        break;
      case ('vigenere'):
        passwordDecrypted.value = cypherMeViginereDecrypt(dividePassword(passwordToDecrypt, repeaterToDecrypt), keywordToDecrypt);
        cypherUsedToDecrypt.value = cypherToDecrypt.text + ' (' + keywordLabelToDecrypt + ' ' + String.fromCharCode.apply(null, cypherMeViginereFilter(keywordToDecrypt)) + ', ' + repeaterToDecryptLabel + ' ' + repeaterToDecrypt + ')';
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
    var passwordEnOrDecrypted = '';

    for (var i = password.length - 1; i >= 0; i--) {
        passwordEnOrDecrypted += password[i];
    }

    return passwordEnOrDecrypted;
  }

  function cypherMeReverseCase(password) {
    var passwordEnOrDecrypted = '';

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

  function cypherMeViginereEncrypt(passwordToEncrypt, keyword) {
    var passwordEncryped = '';
    var filteredKeyword = cypherMeViginereFilter(keyword);

    if (filteredKeyword.length === 0) {

      return passwordToEncrypt;
    } else {

      for(var i = 0, j = 0; i < passwordToEncrypt.length; i++) {
        var currentCharacter = passwordToEncrypt.charCodeAt(i);
      
        switch(true) {
          case (currentCharacter >= 65 && currentCharacter <=  90):
            passwordEncryped += String.fromCharCode( ( (currentCharacter - 65) + (filteredKeyword[j % filteredKeyword.length] - 97) ) % 26 + 65 );
            j++;
            break;
          case (currentCharacter >= 97 && currentCharacter <= 122):
            passwordEncryped += String.fromCharCode( ( (currentCharacter - 97) + (filteredKeyword[j % filteredKeyword.length] - 97) ) % 26 + 97 );
            j++;
            break;
          default:
            passwordEncryped += passwordToEncrypt.charAt(i);
        }
      }

      return passwordEncryped;
    }
  }

  function cypherMeViginereDecrypt(passwordToDecrypt, keyword) {
    var passwordDecrypted = '';
    var filteredKeyword = cypherMeViginereFilter(keyword);

    if (filteredKeyword.length === 0) {

      return passwordToDecrypt;
    } else {

      for(var i=0, j=0; i < passwordToDecrypt.length; i++) {
        var currentCharacter = passwordToDecrypt.charCodeAt(i);
      
        switch(true) {
          case (currentCharacter >= 65 && currentCharacter <=  90):
            passwordDecrypted += String.fromCharCode( ( (currentCharacter - 65) - (filteredKeyword[j % filteredKeyword.length] % 26 - 97) ) % 26 + 65 );
            j++;
            break;
          case (currentCharacter >= 97 && currentCharacter <= 122):
            passwordDecrypted += String.fromCharCode( ( (currentCharacter - 97) - (filteredKeyword[j % filteredKeyword.length] % 26 - 97) ) % 26 + 97 );
            j++;
            break;
          default:
            passwordDecrypted += passwordToDecrypt.charAt(i);
        }
      }

      return passwordDecrypted;
    }
  }

  function cypherMeViginereFilter(keyword) {
    var filteredKeyword = [];

    for (var i = 0; i < keyword.length; i++) {
      var currentCharacter = keyword.toLowerCase().charCodeAt(i);

      if (currentCharacter >= 97 && currentCharacter <= 122 ) {
        filteredKeyword.push(keyword.toLowerCase().charCodeAt(i));
      }
    }

    return filteredKeyword;
  }

  function repeatPassword(passwordEncrypted, repetions) {
    var repeatedPassword = '';

    for (var i = 1; i <= repetions; i++) {
      repeatedPassword += passwordEncrypted;
    }

    return repeatedPassword
  }

  function dividePassword(passwordToDecrypt, repitionsToDecrypt) {
    var passwordLength = parseInt(passwordToDecrypt.length) / parseInt(repitionsToDecrypt)
    var re = new RegExp ('.{1,' + parseInt(passwordLength) + '}', 'g');

    return passwordToDecrypt.match(re)[0];
  }

  function check(isEncryption) {
    if (isEncryption) {
      checkForm({
        cypher: 'cypher',
        password: 'password',
        shift: 'shift',
        keyword: 'keyword',
        repeater: 'repeater',
        passwordCheckMessage: 'passwordCheckMessage',
        passwordCheckString: cypherMeState.localesStrings['8 - 32 characters'],
        shiftCheckMessage: 'shiftCheckMessage',
        shiftCheckString: cypherMeState.localesStrings['1 number between 1 - 26'],
        keywordCheckMessage: 'keywordCheckMessage',
        keywordCheckString: cypherMeState.localesStrings['1 - 32 lowercase lettters'],
        repeaterCheckMessage: 'repeaterCheckMessage',
        repeaterCheckString: cypherMeState.localesStrings['1 number between 1 - 5'],
        button: 'encryptButton'
      });
    } else {
      checkForm({
        cypher: 'cypherToDecrypt',
        password: 'passwordToDecrypt',
        shift: 'shiftToDecrypt',
        keyword: 'keywordToDecrypt',
        repeater: 'repeaterToDecrypt',
        passwordCheckMessage: 'passwordCheckMessageToDecrypt',
        passwordCheckString: cypherMeState.localesStrings['8 - 32 characters'],
        shiftCheckMessage: 'shiftCheckMessageToDecrypt',
        shiftCheckString: cypherMeState.localesStrings['1 number between 1 - 26'],
        keywordCheckMessage: 'keywordCheckMessageToDecrypt',
        keywordCheckString: cypherMeState.localesStrings['1 - 32 lowercase lettters'],
        repeaterCheckMessage: 'repeaterCheckMessageToDecrypt',
        repeaterCheckString: cypherMeState.localesStrings['1 number between 1 - 5'],
        button: 'decryptButton'
      });
    }
  }

  function checkForm(elements) {
    var cypherElement = document.getElementById(elements.cypher);
    var cypher = cypherElement.options[cypherElement.selectedIndex].value;
    var inputsArray = [
      document.getElementById(elements.password),
      document.getElementById(elements.repeater)
    ];
    var checkMessages = [
      [ document.getElementById(elements.passwordCheckMessage), elements.passwordCheckString ],
      [ document.getElementById(elements.repeaterCheckMessage), elements.repeaterCheckString ]
    ];

    switch(cypher) {
      case ('caesar'):
        inputsArray.splice(1, 0, document.getElementById(elements['shift']));
        checkMessages.splice(1, 0, [ document.getElementById(elements.shiftCheckMessage), elements.shiftCheckString]);
        break;
      case ('vigenere'):
        inputsArray.splice(1, 0, document.getElementById(elements.keyword));
        checkMessages.splice(1, 0, [ document.getElementById(elements.keywordCheckMessage), elements.keywordCheckString ]);
        break;
      default:
        console.log('Default case');
    }

    var isInputValid = false; 
    isInputValid = checkInput(inputsArray, checkMessages);

    if(isInputValid)
    {
      document.getElementById(elements.button).disabled = false;
    } else {
      document.getElementById(elements.button).disabled = true;
    }
  }

  function checkInput(inputsArray, checkMessages) {
    var valid = false;

    valid = inputsArray.every(function (element) {
      return element.checkValidity();
    });

    inputsArray.forEach(function(element, index) {
      
      if (element.checkValidity()) {
        checkMessages[index][0].style.color = 'rgb(76,175,80)';
        checkMessages[index][0].style.display = 'none';
        checkMessages[index][0].innerText = '';
      } else {
        checkMessages[index][0].style.color = 'rgb(244,67,54)';
        checkMessages[index][0].style.display = 'inline';
        checkMessages[index][0].innerText = checkMessages[index][1]; 
      }
    })

    if(valid) {

      return true;
    } else {

      return false;
    }
  }

  function toggleView() {
    var cypherElement = document.getElementById('cypher');
    var cypher = cypherElement.options[cypherElement.selectedIndex].value;

    switch(cypher) {
      case ('caesar'): 
        document.getElementById('shift').style.display = 'inline';
        document.getElementById('shiftLabel').style.display = 'inline';
        document.getElementById('keyword').style.display = 'none';
        document.getElementById('keywordLabel').style.display = 'none';
        document.getElementById('keywordCheckMessage').style.display = 'none';
        break;
      case ('vigenere'): 
        document.getElementById('keyword').style.display = 'inline';
        document.getElementById('keywordLabel').style.display = 'inline';
        document.getElementById('shift').style.display = 'none';
        document.getElementById('shiftLabel').style.display = 'none';
        document.getElementById('shiftCheckMessage').style.display = 'none';
        break;
      default:
        document.getElementById('shift').style.display = 'none';
        document.getElementById('shiftLabel').style.display = 'none';
        document.getElementById('shiftCheckMessage').style.display = 'none';
        document.getElementById('keyword').style.display = 'none';
        document.getElementById('keywordLabel').style.display = 'none';
        document.getElementById('keywordCheckMessage').style.display = 'none';
    }
  }

  function toggleViewToDecrypt() {
    var cypherElement = document.getElementById('cypherToDecrypt');
    var cypherToDecrypt = cypherElement.options[cypherElement.selectedIndex].value;

    switch(cypherToDecrypt) {
      case ('caesar'): 
        document.getElementById('shiftToDecrypt').style.display = 'inline';
        document.getElementById('shiftLabelToDecrypt').style.display = 'inline';
        document.getElementById('keywordToDecrypt').style.display = 'none';
        document.getElementById('keywordLabelToDecrypt').style.display = 'none';
        document.getElementById('keywordCheckMessageToDecrypt').style.display = 'none';
        break;
      case ('vigenere'): 
        document.getElementById('keywordToDecrypt').style.display = 'inline';
        document.getElementById('keywordLabelToDecrypt').style.display = 'inline';
        document.getElementById('shiftToDecrypt').style.display = 'none';
        document.getElementById('shiftLabelToDecrypt').style.display = 'none';
        document.getElementById('shiftCheckMessageToDecrypt').style.display = 'none';
        break;
      default:
        document.getElementById('shiftToDecrypt').style.display = 'none';
        document.getElementById('shiftLabelToDecrypt').style.display = 'none';
        document.getElementById('shiftCheckMessageToDecrypt').style.display = 'none';
        document.getElementById('keywordToDecrypt').style.display = 'none';
        document.getElementById('keywordLabelToDecrypt').style.display = 'none';
        document.getElementById('keywordCheckMessageToDecrypt').style.display = 'none';
    }
  }

  // only for (server-side) testing purposes JSON.parse('{{{toJSON localesStrings}}}')
  if (typeof module !== 'undefined' && module.exports) {

    return {
      cypherMeCaesarEncrypt: cypherMeCaesarEncrypt,
      cypherMeCaesarDecrypt: cypherMeCaesarDecrypt,
      cypherMeReverse: cypherMeReverse,
      cypherMeReverseCase: cypherMeReverseCase,
      cypherMeViginereEncrypt: cypherMeViginereEncrypt,
      cypherMeViginereDecrypt: cypherMeViginereDecrypt,
      repeatPassword: repeatPassword,
      dividePassword: dividePassword,
    } 
  } 

  return {
    cypherMe: cypherMe,
    deCypherMe: deCypherMe,
    check: check,
    toggleView: toggleView,
    toggleViewToDecrypt: toggleViewToDecrypt,
  }
})();


// only for (server-side) testing purposes JSON.parse('{{{toJSON localesStrings}}}')
if (typeof module !== 'undefined' && module.exports) {
  
  module.exports = {
    cypherMeCaesarEncrypt: cypherMeApp.cypherMeCaesarEncrypt,
    cypherMeCaesarDecrypt: cypherMeApp.cypherMeCaesarDecrypt,
    cypherMeReverse: cypherMeApp.cypherMeReverse,
    cypherMeReverseCase: cypherMeApp.cypherMeReverseCase,
    cypherMeViginereEncrypt: cypherMeApp.cypherMeViginereEncrypt,
    cypherMeViginereDecrypt: cypherMeApp.cypherMeViginereDecrypt,
    repeatPassword: cypherMeApp.repeatPassword,
    dividePassword: cypherMeApp.dividePassword,
  } 
}




