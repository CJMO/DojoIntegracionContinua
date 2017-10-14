/*const mocha = require('mocha');
const chai = require('chai');
const assert = require('assert');
const CodeBreaker = require('./main');*/

var mocha = require('mocha'),
    supertest = require('supertest'),
    chai = require('chai'),
    should = require('should'),
    assert = require('assert'),
    CodeBreaker = require('./main'),
    app = require('./app.js');;

var request = supertest(app)
var expect = chai.expect;

beforeEach( function(){
      CodeBreaker.setSecret('1234')
} );

describe('CodeBreaker', function() {
  it('should return XXXX if 1234 is sended', function() {
    let result = CodeBreaker.codeBreaker(1234);
    assert.equal('XXXX',result);
  });
  it('should return EMPTY if 5678 is sended', function() {
    let result = CodeBreaker.codeBreaker(5678);
    assert.equal('',result);
  });

  it('should return _ if 4567 is sended', function() {
    let result = CodeBreaker.codeBreaker(4567);
    assert.equal('_',result);
  });

  it('should return X if 7564 is sended', function() {
    let result = CodeBreaker.codeBreaker(7564);
    assert.equal('X',result);
  });

  it('should return XX if 7534 is sended', function() {
    let result = CodeBreaker.codeBreaker(7534);
    assert.equal('XX',result);
  });

  it('should return XX_ if 7134 is sended', function() {
    let result = CodeBreaker.codeBreaker(7134);
    assert.equal('XX_',result);
  });


  it('should return ____ if 4321 is sended', function() {
    let result = CodeBreaker.codeBreaker(4321);
    assert.equal('____',result);
  });

  it('should return ERROR no number is sended', function() {
    let result = CodeBreaker.codeBreaker();
    assert.equal('ERROR',result);
  });

  it('should return ERROR number length is greather than 4', function() {
    let result = CodeBreaker.codeBreaker(12345);
    assert.equal('ERROR',result);
  });

  it('should return ERROR number length is shorter than 4', function() {
    let result = CodeBreaker.codeBreaker(123);
    assert.equal('ERROR',result);
  });

  it('should return ERROR argument is not a number', function() {
    let result = CodeBreaker.codeBreaker('asda');
    assert.equal('ERROR',result);
  });

  it('should return X__ if 1543 is sended', function() {
    let result = CodeBreaker.codeBreaker(1543);
    assert.equal('X__',result);
  });

  it('should return X___  if 1342 is sended', function() {
    let result = CodeBreaker.codeBreaker(1342);
    assert.equal('X___',result);
  });

  it('should return ERROR  if there is a duplicated number sended', function() {
    let result = CodeBreaker.codeBreaker(1344);
    assert.equal('ERROR',result);
  });

  it('should return ERROR  if the e character is  sended', function() {
    let result = CodeBreaker.codeBreaker('1e23');
    assert.equal('ERROR',result);
  });

});


// PRUEBAS API
describe('GET /setSecret/:number', function() {
    it('should return code 200', function(done) {
        request.get('/setSecret/1234')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a Content-Type application/json', function(done) {
        request.get('/setSecret/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a correct message Json Object', function(done) {
        request.get('/setsecret/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.message);
  		    		done();
  			    });
    });

});

describe('GET /guess/:number', function() {
    it('should return code 200', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a Content-Type application/json', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a correct result Json Object', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.result);
  		    		done();
  			    });
    });

    it('should guess the correct number', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.result);
              assert.equal('XXXX',res.body.result);
  		    		done();
  			    });
    });

});
