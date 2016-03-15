var request = require('request');
var should = require('should');
var superagent = require('superagent');


	describe('jasmine-node', function(){

		it('should pass', function(){
			expect(1+2).toEqual(3);
		});
		
		it("Get List of all the users", function(done) {
			request("http://localhost:3000/api/getUsers", function(error, response, body){
				
				var result = JSON.parse(response.body);
				//var userList = JSON.parse(result.result);
				expect(result.result.userinfo.length).toBe(1);
				expect(result.status).toBe('Success');
				done();
			});
			}, 500);
	});


/*
describe("UserController", function(){
	it("Contains user control's specs", function(){
		
		var agent = superagent.agent();
		it("should be rejected", function(done){
			agent
			.post('http://localhost:3000/api/authenticateuser')
			.send({username:'vicky@gmail.com',password:'test123'})
			.end(onReponse);
			
			function onResponse(err, res)
			{
				res.should.have.status(200);
				return done();
			}
		});
	});
});*/