'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('https://192.168.4.11:10011'); // supertest init;
var expect = chai.expect;
var assert = chai.assert;

var clientApp = require('../../../public/cypherMeApp');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var urlsToTest = ['/de', '/en', '/es', '/fr'];

describe('/{locale}', function() {
  describe('get', function() {

    urlsToTest.forEach(function (currentValue) {
      it(currentValue + ' should respond with 200 Success', function(done) {
        api.get(currentValue)
        .set('Content-Type', 'text/html')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          
          expect(res.body).to.not.equal(null);
          // expect(clientApp.cypherMeCaesarEncrypt('abc123', 1)).to.equal('bcd123');
          done();
        });
      });
    })
  });
});

describe('Cyphers:', function () {
  describe('Caesar:', function () {
    var valuesToTest = [
      ['abc123', 'abc123', 0, 'abc123abc123abc123abc123abc123'],
      ['abc123', 'bcd123', 1, 'bcd123bcd123bcd123bcd123bcd123'],
      ['abc123', 'klm123', 10, 'klm123klm123klm123klm123klm123'],
      ['abc123', 'zab123', 25, 'zab123zab123zab123zab123zab123'],
      ['abc123', 'abc123', 26, 'abc123abc123abc123abc123abc123'],
      ['elMoQQÜ+123ÖÄU??', 'elMoQQÜ+123ÖÄU??', 0, 'elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??'],
      ['elMoQQÜ+123ÖÄU??', 'fmNpRRÜ+123ÖÄV??', 1, 'fmNpRRÜ+123ÖÄV??fmNpRRÜ+123ÖÄV??fmNpRRÜ+123ÖÄV??fmNpRRÜ+123ÖÄV??fmNpRRÜ+123ÖÄV??'],
      ['elMoQQÜ+123ÖÄU??', 'ovWyAAÜ+123ÖÄE??', 10, 'ovWyAAÜ+123ÖÄE??ovWyAAÜ+123ÖÄE??ovWyAAÜ+123ÖÄE??ovWyAAÜ+123ÖÄE??ovWyAAÜ+123ÖÄE??'],
      ['elMoQQÜ+123ÖÄU??', 'dkLnPPÜ+123ÖÄT??', 25, 'dkLnPPÜ+123ÖÄT??dkLnPPÜ+123ÖÄT??dkLnPPÜ+123ÖÄT??dkLnPPÜ+123ÖÄT??dkLnPPÜ+123ÖÄT??'],
      ['elMoQQÜ+123ÖÄU??', 'elMoQQÜ+123ÖÄU??', 26, 'elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??elMoQQÜ+123ÖÄU??'],
      ['el MoQQÜ + 123ÖÄ U??', 'el MoQQÜ + 123ÖÄ U??', 0, 'el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??'],
      ['el MoQQÜ + 123ÖÄ U??', 'fm NpRRÜ + 123ÖÄ V??', 1, 'fm NpRRÜ + 123ÖÄ V??fm NpRRÜ + 123ÖÄ V??fm NpRRÜ + 123ÖÄ V??fm NpRRÜ + 123ÖÄ V??fm NpRRÜ + 123ÖÄ V??'],
      ['el MoQQÜ + 123ÖÄ U??', 'ov WyAAÜ + 123ÖÄ E??', 10, 'ov WyAAÜ + 123ÖÄ E??ov WyAAÜ + 123ÖÄ E??ov WyAAÜ + 123ÖÄ E??ov WyAAÜ + 123ÖÄ E??ov WyAAÜ + 123ÖÄ E??'],
      ['el MoQQÜ + 123ÖÄ U??', 'dk LnPPÜ + 123ÖÄ T??', 25, 'dk LnPPÜ + 123ÖÄ T??dk LnPPÜ + 123ÖÄ T??dk LnPPÜ + 123ÖÄ T??dk LnPPÜ + 123ÖÄ T??dk LnPPÜ + 123ÖÄ T??'],
      ['el MoQQÜ + 123ÖÄ U??', 'el MoQQÜ + 123ÖÄ U??', 26, 'el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??el MoQQÜ + 123ÖÄ U??']
    ];
    valuesToTest.forEach(function (currentArray) {
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Shift: ' + currentArray[2] + ')', function (done) {
        assert(clientApp.cypherMeCaesarEncrypt(currentArray[0], currentArray[2]) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0] + ' (Shift: ' + currentArray[2] + ')', function (done) {
        assert(clientApp.cypherMeCaesarDecrypt(currentArray[1], currentArray[2]) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Shift: ' + currentArray[2] + ', Repetions: 1)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeCaesarEncrypt(currentArray[0], currentArray[2]), 1) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0] + ' (Shift: ' + currentArray[2] + ', Repetions: 1)', function (done) {
        assert(clientApp.cypherMeCaesarDecrypt(clientApp.dividePassword(currentArray[1], 1) , currentArray[2]) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[3] + ' (Shift: ' + currentArray[2] + ', Repetions: 5)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeCaesarEncrypt(currentArray[0], currentArray[2]), 5) === currentArray[3]);
        done();
      });
      it('should decrypt ' + currentArray[3] + ' to ' + currentArray[0] + ' (Shift: ' + currentArray[2] + ', Repetions: 5)', function (done) {
        assert(clientApp.cypherMeCaesarDecrypt(clientApp.dividePassword(currentArray[3], 5) , currentArray[2]) === currentArray[0]);
        done();
      });     
    });
  });
});

describe('Cyphers:', function () {
  describe('Reverse word:', function () {
    var valuesToTest = [
      ['abc123', '321cba', '321cba321cba321cba'],
      ['elMoQQÜ+123ÖÄU??', '??UÄÖ321+ÜQQoMle', '??UÄÖ321+ÜQQoMle??UÄÖ321+ÜQQoMle??UÄÖ321+ÜQQoMle'],
      ['el MoQQÜ + 123ÖÄ U??', '??U ÄÖ321 + ÜQQoM le', '??U ÄÖ321 + ÜQQoM le??U ÄÖ321 + ÜQQoM le??U ÄÖ321 + ÜQQoM le']
    ];
    valuesToTest.forEach(function (currentArray) {
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1], function (done) {
        assert(clientApp.cypherMeReverse(currentArray[0]) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0], function (done) {
        assert(clientApp.cypherMeReverse(currentArray[1]) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Repetions: 1)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeReverse(currentArray[0]), 1) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0] + ' (Repetions: 1)', function (done) {
        assert(clientApp.cypherMeReverse(clientApp.dividePassword(currentArray[1], 1)) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[2] + ' (Repetions: 3)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeReverse(currentArray[0]), 3) === currentArray[2]);
        done();
      });
      it('should decrypt ' + currentArray[2] + ' to ' + currentArray[0] + ' Repetions: 3)', function (done) {
        assert(clientApp.cypherMeReverse(clientApp.dividePassword(currentArray[2], 3)) === currentArray[0]);
        done();
      });     
    });
  });
});

describe('Cyphers:', function () {
  describe('Reverse word and case:', function () {
    var valuesToTest = [
      ['abc123', '321CBA', '321CBA321CBA321CBA321CBA'],
      ['elMoQQÜ+123ÖÄU??', '??uÄÖ321+ÜqqOmLE', '??uÄÖ321+ÜqqOmLE??uÄÖ321+ÜqqOmLE??uÄÖ321+ÜqqOmLE??uÄÖ321+ÜqqOmLE'],
      ['el MoQQÜ + 123ÖÄ U??', '??u ÄÖ321 + ÜqqOm LE', '??u ÄÖ321 + ÜqqOm LE??u ÄÖ321 + ÜqqOm LE??u ÄÖ321 + ÜqqOm LE??u ÄÖ321 + ÜqqOm LE']
    ];
    valuesToTest.forEach(function (currentArray) {
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1], function (done) {
        assert(clientApp.cypherMeReverseCase(currentArray[0]) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0], function (done) {
        assert(clientApp.cypherMeReverseCase(currentArray[1]) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Repetions: 1)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeReverseCase(currentArray[0]), 1) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0] + ' (Repetions: 1)', function (done) {
        assert(clientApp.cypherMeReverseCase(clientApp.dividePassword(currentArray[1], 1)) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[2] + ' (Repetions: 4)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeReverseCase(currentArray[0]), 4) === currentArray[2]);
        done();
      });
      it('should decrypt ' + currentArray[2] + ' to ' + currentArray[0] + ' Repetions: 4)', function (done) {
        assert(clientApp.cypherMeReverseCase(clientApp.dividePassword(currentArray[2], 4)) === currentArray[0]);
        done();
      });     
    });
  });
});

describe('Cyphers:', function () {
  describe('Vigenère:', function () {
    var valuesToTest = [
      ['abc123', 'abc123', '', 'abc123abc123'],
      ['abc123', 'abc123', 'a', 'abc123abc123'],
      ['abc123', 'qrs123', 'q', 'qrs123qrs123'],
      ['abc123', 'zab123', 'z', 'zab123zab123'],
      ['abc123', 'abc123', '!"§$%&/123=;:-', 'abc123abc123'],
      ['abc123', 'ace123', 'abc123', 'ace123ace123'],
      ['abc123', 'ace123', '#_!abc123-!345*!Öldk', 'ace123ace123'],
      ['elMoQQÜ+123ÖÄU??', 'iwYcGGÜ+123ÖÄO??', 'elMoQQÜ+123ÖÄU??', 'iwYcGGÜ+123ÖÄO??iwYcGGÜ+123ÖÄO??'],
      ['elMoQQÜ+123ÖÄU??', 'egQfOBÜ+123ÖÄI??', 'AveryLONGwordAveryLONGwordAveryLONGwordAveryLONGwordAveryLONGword', 'egQfOBÜ+123ÖÄI??egQfOBÜ+123ÖÄI??'],
      ['elMoQQÜ+123ÖÄU??', 'evQmMYÜ+123ÖÄN??',  'A KEY with Spaces', 'evQmMYÜ+123ÖÄN??evQmMYÜ+123ÖÄN??'],
      ['el MoQQÜ + 123ÖÄ U??', 'iw YcGGÜ + 123ÖÄ O??', 'el MoQQÜ + 123ÖÄ U??', 'iw YcGGÜ + 123ÖÄ O??iw YcGGÜ + 123ÖÄ O??'],
      ['el MoQQÜ + 123ÖÄ U??', 'eg QfOBÜ + 123ÖÄ I??', 'AveryLONGwordAveryLONGwordAveryLONGwordAveryLONGwordAveryLONGword', 'eg QfOBÜ + 123ÖÄ I??eg QfOBÜ + 123ÖÄ I??'],
      ['el MoQQÜ + 123ÖÄ U??', 'ev QmMYÜ + 123ÖÄ N??', 'A KEY with Spaces', 'ev QmMYÜ + 123ÖÄ N??ev QmMYÜ + 123ÖÄ N??']
    ];
    valuesToTest.forEach(function (currentArray) {
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Key: ' + currentArray[2], function (done) {
        assert(clientApp.cypherMeViginereEncrypt(currentArray[0], currentArray[2]) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0]+ ' (Key: ' + currentArray[2], function (done) {
        assert(clientApp.cypherMeViginereDecrypt(currentArray[1], currentArray[2]) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Key: ' + currentArray[2] + ' Repetions: 1)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeViginereEncrypt(currentArray[0], currentArray[2]), 1) === currentArray[1]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0] + ' (Key: ' + currentArray[2] + ' Repetions: 1)', function (done) {
        assert(clientApp.cypherMeViginereDecrypt(clientApp.dividePassword(currentArray[1], 1), currentArray[2]) === currentArray[0]);
        done();
      });
      it('should encrypt ' + currentArray[0] + ' to ' + currentArray[1] + ' (Key: ' + currentArray[2] + ' Repetions: 2)', function (done) {
        assert(clientApp.repeatPassword(clientApp.cypherMeViginereEncrypt(currentArray[0], currentArray[2]), 2) === currentArray[3]);
        done();
      });
      it('should decrypt ' + currentArray[1] + ' to ' + currentArray[0] + ' (Key: ' + currentArray[2] + ' Repetions: 2)', function (done) {
        assert(clientApp.cypherMeViginereDecrypt(clientApp.dividePassword(currentArray[3], 2), currentArray[2]) === currentArray[0]);
        done();
      });     
    });
  });
});
