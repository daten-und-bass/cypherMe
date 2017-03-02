'use strict';
var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe('/en/about', function() {
  describe('get', function() {
    it('should respond with 200 Success', function(done) {
      request({
        url: 'https://localhost:10011/en/about',
        qs: {
          lang: 'en'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'text/html'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.not.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with default Error', function(done) {
      request({
        url: 'https://localhost:10011/en/about/ee',
        qs: {
          lang: 'en'
        },
        method: 'GET',
        headers: {
          'Content-Type': 'text/html'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(404);

        expect(body).to.not.equal(null); // non-json response or no schema
        done();
      });
    });
  });

  describe('/en/about?{lang}={locale}', function() {
    describe('get for allowed requests', function() {

      var urlsToTest = ['/en/about?lang=en', '/en/about?lang=de', '/en/about?lang=es', '/en/about?lang=fr'];
      urlsToTest.forEach(function (currentValue) {
        it(currentValue + ' should respond with 200 Success', function(done) {
          request({
            url: 'https://localhost:10011' + currentValue,
            method: 'GET',
            headers: {
              'Content-Type': 'text/html'
            }
          },
          function(error, res, body) {
            if (error) return done(error);

            expect(res.statusCode).to.equal(200);

            expect(body).to.not.equal(null); // non-json response or no schema
            done();
          });
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
        request({
          url: 'https://localhost:10011' + currentValue,
          method: 'GET',
          headers: {
            'Content-Type': 'text/html'
          }
        },
        function(error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          expect(body).to.not.equal(null); // non-json response or no schema
          done();
        });
      });
    });
  });
});
