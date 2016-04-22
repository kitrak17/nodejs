// File : controller/Users.js --> 							
var md5 	= require('md5');
var hat 	= require('hat');
var fs 		= require('fs');
var util 	= require('util');
var path = require('path');
var randomstring = require("randomstring");
var common 	= require('../controllers/Common');
var multer	=	require('multer');


//User controller
function user(){
	data 	= {};
	tomodel = {};
	models 	= require('../models');
};
user.prototype.constructor = user;

//Function to signup user
user.prototype.signup =  function(req, res) {
	var user = req.body;
	var error = req.validationErrors();
   if(error) { 
              res.status(202).json(error); 
         }
	else {
		var verify_code = randomstring.generate({
							  length: 5,
							  charset: 'numeric'
							});
		models.User.findOrCreate({
			attributes: ['id','first_name','last_name','email'],
		    where: {email: user.email},
		    defaults: {first_name: user.first_name, last_name: user.last_name, password: md5(user.password), verify_code: verify_code}
		}).spread(function (user, created) {
		    if (created === false)  { 
		    	res.status(202).json([{param:"email",value:user.email,msg: "Email already registered"}]); 
		    }
		    else {
		    	var from_name 	= "Shindig";
		    	var from_email 	= "shindig@gmail.com";
		    	var to_name 	= user.first_name + " " + user.last_name;
		    	var to_email 	= user.email;
		    	var subject 	= "Verify your email address";
		    	var message = "Hi " + to_name + ", \n \n Here is your verification code. " + verify_code + " Enter it in your Application screen.";
		    	sendEmail(from_name,from_email,to_name,to_email,subject,message); 
		    	res.status(200).json([{msg: "Registration successfull", user_id:user.id}]);
		    }
		}).catch(function (error) {
			res.status(400).json([{result: "Error occured"}]);
		});
	}
}

//Function to login
user.prototype.login =  function(req, res) {
		var cred 	= req.body;
		var error 	= req.validationErrors();
	    if(error) { 
	        res.status(202).json(error); 
	    } else {
	    	var pass = md5(cred.password);
			models.User.findOne({attributes: ['email','id'], where: {email: cred.email, password: pass}})
	        .then(function (user) {
	        	if(user) { 
	        			var currentDate = new Date();
						currentDate.addDays(5);
						var dd = currentDate.getDate();
			            var mm = currentDate.getMonth()+1;
			            var yyyy = currentDate.getFullYear();
			            var h = currentDate.getHours();
			            var m = currentDate.getMinutes();
			            var s = currentDate.getSeconds();

						var expire = yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;
						var src_token = new Buffer(user.id + "|" + expire);
						var token = src_token.toString('base64');

		        		models.User.update({
						  remember_token: token,
						  expire_time: expire,
						}, {
						  where: {
						    id: user.id
						  }
						});
						user.remember_token = token;
	        			//res.json([{result: "Logged in successfully", user_id: user.id, status: true}]); 
	        			res.status(200).json([{result: "Logged in successfully", user_id: user.id, remember_token:token, status: true}]); 
	        	}
	        	else { 
	        		//res.json({result: "Login failed", status: false}); 
	        		res.status(202).json([{result: "Login failed", status: false}]); 
	        	}
	        }).catch(function (error) {
	            res.json({result: "Unexpected error", data: error, status: false});
	        });
	    }		
}



//Function to  user profile
user.prototype.verifycode =  function(req, res) {
		var data 	= req.body;
		var error 	= req.validationErrors();
		if(error) { 
	        res.status(202).json(error); 
	    } else {
	    	models.User.findOne({attributes: ['id','status'], where: {id: data.user_id, verify_code: data.verify_code}})
	        .then(function (user) {
	        	if(user) { 
	        			if(user.status=='0') {
	        				models.User.update({
							  status: '1',
							}, {
							  where: {
							    id: data.user_id
							  }
							});
		        			res.status(200).json([{result: "Verified Successfully", user_id: user.id, status: true}]); 
	        			}
	        			else {
	        				res.status(202).json([{result: "Already Verified!", user_id: user.id, status: true}]); 
	        			}
		        		
	        	}
	        	else { 
	        		res.status(202).json([{result: "Invalid Code"}]); 
	        	}
	        }).catch(function (error) {
	            res.status(400).json([{result: "Unexpected error"}]);
	        });
	    }
		
}


//Function to  forgot passsword request
user.prototype.forgotpassreq =  function(req, res) {
		var data = req.body;
		var error 	= req.validationErrors();
		if(error) { 
	        res.status(202).json(error); 
	    } else {
	    	var verify_code = randomstring.generate({
							  length: 5,
							  charset: 'numeric'
							});
			models.User.findOne({attributes: ['id'], where: {email: data.email}})
	        .then(function (user) {
	        	if(user) { 
	        				models.User.update({
							  verify_code: verify_code,
							}, {
							  where: {
							    id: user.id
							  }
							});
		        			res.status(200).json([{result: "Verification code has been sent to your email address.", user_id: user.id, status: true}]); 
	        	}
	        	else { 
	        		res.status(202).json([{result: "Email id not found"}]); 
	        	}
	        }).catch(function (error) {
	            res.status(400).json([{result: "Unexpected error"}]);
	        });
	    }
}

//Function to  forgotpass change password
user.prototype.forgotpasschange =  function(req, res) {
		var data = req.body;
		var error 	= req.validationErrors();
		if(error) { 
	        res.status(202).json(error); 
	    } else {
			models.User.findOne({attributes: ['id'], where: {id: data.user_id,verify_code:data.verify_code }})
	        .then(function (user) {
	        	if(user) { 
	        				models.User.update({
							  password: md5(data.password),
							}, {
							  where: {
							    id: user.id
							  }
							});
		        			res.status(200).json([{result: "Password has been changed successfully.", user_id: user.id, status: true}]); 
	        	}
	        	else { 
	        		res.status(202).json([{result: "Verify code is invalid"}]); 
	        	}
	        }).catch(function (error) {
	            res.status(400).json([{result: "Unexpected error"}]);
	        });
	    }
}


//Function to  update profile
user.prototype.photoupload =  function(req, res) {

		var upload = multer({
		      dest: './uploads/',
		      limits : { fileSize : 100000 },
		      fileFilter : function (req, file, cb) {
								 if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
								 	 cb(null, true);
								 }
								 else {
								 	  cb(new Error('I don\'t have a clue!'));
								 }
							},
		}).single('image');

		upload(req,res,function(err) {
				if(err) {
					res.status(202).json([{msg: "Allowed image extensions are jpg,png and image size should not exist 1 MB.", error: err}]);
				} else {
					var data = req.body;
					var file = req.file;
					models.User.update({
						  profile_pic:file.path,
						  first_name:data.first_name,
						  last_name:data.last_name,
						}, {
						  where: {
						    id: data.user_id
						  }
					});
					res.status(200).json([{msg: "Profile updated successfully.", status: true}]);
				}
		});
}

module.exports = new user();