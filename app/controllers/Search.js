// File : controller/Search.js --> 							
var common 	= require('../controllers/Common');

//Search controller
function search(){
	data 	= {};
	tomodel = {};
	models 	= require('../models');
};
search.prototype.constructor = search;

//Function to search user by name
search.prototype.name =  function(req, res) {
		var data = req.body;
		verifyToken(data._token,function(response){
					if(response) {
						var error = req.validationErrors();
					   if(error) { 
					            res.status(202).json(error); 
					    } else {
							    models.User.findAndCountAll({
								  attributes: ['id','first_name','last_name'],
								  where: {
								  	 $or: [
										    {
										      first_name: {
										        $like: '%'+ data.name +'%'
										     }
										    },
										    {
										      last_name: {
										        $like: '%'+ data.name +'%'
										     }
										    }
										  ]
								  }
								}).then(function (users) {
									if(users.count)	res.status(200).json(users); 
									else	res.status(202).json([{message: 'No results'}]); 
								});
		    			}			
					}
					else {
						res.status(202).json([{message: 'Invalid Token'}]); 
					}
	    });
}


//Function to send friend request
search.prototype.sendrequest =  function(req, res) {
		var data = req.body;
		var error = req.validationErrors();
	   if(error) { 
	              res.status(202).json(error); 
	    } else {
	    		if(data.user_id == data.request_to) res.status(202).json([{msg:'You cannot send request to yourself'}]);
	    		else {
	    				var date = new Date();
			    		models.Friend.findOrCreate({
							attributes: ['id','status'],
						    where: {
						    		$and: [
							    			{
							    				$or: [
												    {
												      user_id: data.user_id
												    },
												    {
												      friend_id: data.user_id
												    }
												  ]
							    			},
							    			{
							    					$or: [
												    {
												      user_id: data.request_to
												    },
												    {
												      friend_id: data.request_to
												    }
												  ]
							    			}

						    		]	  
								},
						    defaults: {user_id: data.user_id, friend_id: data.request_to,request_sent_on:date}
						}).spread(function (friend, created) {
						    if (created === false)  { 
						    	if(friend.status==1) res.status(202).json([{msg: 'User is already friend with you'}]); 
						    	else res.status(202).json([{msg: 'Friend request is pending'}]); 
						    }
						    else {
						    	res.status(200).json([{msg: 'Friend request sent successfully'}]);
						    }
						}).catch(function (error) {
							res.status(400).json([{result: "Error occured"}]);
						});
	    		} 
	    }
}

module.exports = new search();