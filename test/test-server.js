var should 	= require('should'); 
var expect  = require("chai").expect;
var con 	= require("../app/app");
//var user 	= require("../app/controllers/Users");
var models 	= require("../app/models");
var request = require('supertest'); 
//var fs = require('fs');
var url 	= 'http://127.0.0.1:8081';
//var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
//var log_stdout = process.stdout;


describe('User Signup',function(res) {

	var profile = {
        first_name: 'vgheri',
        last_name: 'test',
        email: 'Vjjalssessrio@gmail.com',
        password: 'GheriSDj'
    };
	before(function(){
		 // models.User.truncate();
	});
	it('user signup should return 200 and expected key user_id', function(done) {
		setTimeout(function(){
		    request(url)
			.post('/users/signup')
			.send(profile)
		    // end handles the response
			.end(function(err, res) {
			 	expect(err).to.be.null;
				should(res).have.property('status', 200);
				should(res.body[0]).have.property('user_id',1);
				done();
			});
		}, 50);
	});
    it('should return error trying to save duplicate email', function(done) {
	    request(url)
		.post('/users/signup')
		.send(profile)
	    // end handles the response
		.end(function(err, res) {
			expect(err).to.be.null;
			should(res).have.property('status', 202);
			done();
		});
	});
});


describe('User Login',function(res) {

	var profile = {
        email: 'Vjjalssessrio@gmail.com',
        password: 'GheriSDj'
    };
	it('user login should return 200 and expected key user_id', function(done) {
		setTimeout(function(){
		    request(url)
			.post('/users/login')
			.send(profile)
		    // end handles the response
			.end(function(err, res) {
			 	expect(err).to.be.null;
				should(res).have.property('status', 200);
				should(res.body[0]).have.property('user_id',1);
				should(res.body[0]).have.property('remember_token');
				done();
			});
		}, 50);
	});
});