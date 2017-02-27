'use strict';
var chai = require('chai');
var supertest = require('supertest');
var api = supertest('https://0.0.0.0:10011'); // supertest init;
var expect = chai.expect;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('/', function() {
  describe('get', function() {
    it('should respond with 302 Success', function(done) {
      api.get('/')
      .set('Content-Type', 'text/html')
      .expect(302)

      done();
    });
  });
});
