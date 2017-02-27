'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('https://localhost:10011'); // supertest init;
var expect = chai.expect;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('/en/about?{lang}={locale}', function() {
  describe('get for allowed requests', function() {

    var urlsToTest = ['/en/about?lang=en', '/en/about?lang=de', '/en/about?lang=es', '/en/about?lang=fr'];
    urlsToTest.forEach(function (currentValue) {
      it(currentValue + ' should respond with 200 Success', function(done) {

        api.get(currentValue)
        .set('Content-Type', 'text/html')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.body).to.not.equal(null); 
          
          done();
        });
      });
    });
  });
});

describe('/de|fr|es/about?{lang}={locale}', function() {
  describe('get for bad requests', function() {

    var urlsToTest = ['/de/about?lang=de', '/es/about?lang=es', '/fr/about?lang=fr'];
    urlsToTest.forEach(function (currentValue) {
      it(currentValue + ' should respond with 404 Not Found (', function(done) {

        api.get(currentValue)
        .set('Content-Type', 'text/html')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);          
          done();
        });
      });
    });
  });
});
