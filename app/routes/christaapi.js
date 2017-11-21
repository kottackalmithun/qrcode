/*var User = require('../models/user');
//var Machine = require('../models/machine');
var jwt	  = require('jsonwebtoken');
var secret = 'cryptography'
var request = require('request');

module.exports = function(router) {
var previous=0;

 
// var params = {screen_name: 'nodejs'};
	router.post('/admin',function(req,res) {
		console.log('entered login');
		var admin = new Admin(); //saving instance in variable admin
		admin.adminname = req.body.adminname;
		admin.password = req.body.password;
		if(req.body.adminname == null || req.body.adminname == '' || req.body.password == null || req.body.password == ''){
			res.send('Ensure username and password were 1 provided');

		} else {

			admin.save(function(err){
			if(err){
				res.send('Admin name already exists!!');
			} else {
				res.send('Admin Created');
			}

		});
		}

		});

		router.post('/register',function(req,res) {
			console.log('entered machine');
		var user 		= new User();
		user.email 		= req.body.email;
		user.password		= req.body.pass;
		user.username = req.body.uname;
		user.RegDate = new Date(Date.now());
		user.Expdate =  new Date(Date.now() +(7*24*60*60*1000));
		user.QRGenerated = 0;
        user.QRRemain = 0;
        user.paid = false;
		
		if(req.body.email == null || req.body.email == '' || req.body.pass == null || req.body.pass == '' || req.body.uname == null || req.body.uname == '')
		{
			res.send('Ensure email, username and password were provided');
			res.json({ success: false, message : 'Ensure fields are filled'});

		} else {

			user.save(function(err){
			if(err){
				res.json({success:false, message: 'Duplication of fields'});
			} else {
				res.json({success :true, message: 'Registration Successfully Completed!'});
			}

		});
		}

		});




	//ADMIN LOGIN ROUTE
	//http://localhost:3030/api/authenticate
	router.post('/authenticate',function(req,res){

		Admin.findOne({adminname: req.body.adminname }).select('adminname password').exec(function(err,admin){
			if(err) throw err;

			if(!admin){
				res.json({success: false,message: 'Could not authenticate admin'});
			} else if(admin){

				//if(req.body.password) {
					var validPassword = admin.comparePassword(req.body.password);
				//} else {
			//		res.json({success: false, message: 'No password provided'});
				//}
				
				if(!validPassword) {
					res.json({success: false, message: 'Could not authenticate password'});
				} else {
					var token = jwt.sign({ adminname: admin.adminname},secret, { expiresIn: '24h'});
					res.json({success: true, message: 'Authenticated Successfully!', token: token});
				}
			}
		}); 

	});

	router.use(function(req,res,next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){

	//verify token
	jwt.verify(token,secret,function(err,decoded){

		if(err) {
			res.json({success: false, message: 'Token Invalid'});
		}else{
			req.decoded = decoded;
			next();
		}
	});

}else {
			res.json({success: false,message: "No token provided"});
		}
	});

	router.post('/me', function(req,res){
		res.send(req.decoded);
	});




router.get('/energy',function(req,res){


	
		//res.send(req.decoded);

		console.log('jikajiaka');
		//appu.location.reload(true);
		request('https://api.enphaseenergy.com/api/v2/systems/67/summary?key=96a7de32fabc1dd8ff68ec43eca21c06&user_id=4d7a45774e6a41320a', function (error, response, body) {
		 var energyinfo = JSON.parse(body);
		 console.log(energyinfo);
		 console.log(energyinfo.energy_lifetime);
		 var total_energy=(energyinfo.energy_lifetime+energyinfo.energy_today)/1000000;
		 console.log(total_energy);
		 var current = total_energy;
		 
		
			console.log('previous zero');
			client.post('statuses/update', {status: 'Total energy =' +total_energy},  function(error, tweet, response) {
  		if(error) {
  		console.log(error);}
  		// console.log(tweet);  // Tweet body. 
  		// console.log(response);  // Raw response object. 
         });
		 
			 res.json({success:true, message:'Total energy =' +total_energy});
		
		});

		var myVar = setInterval(function(){ myTimer() }, 5000);
		function myTimer() {


		console.log('jikajiaka');
		//appu.location.reload(true);
		request('https://api.enphaseenergy.com/api/v2/systems/67/summary?key=96a7de32fabc1dd8ff68ec43eca21c06&user_id=4d7a45774e6a41320a', function (error, response, body) {
		 var energyinfo = JSON.parse(body);
		 console.log(energyinfo);
		 console.log(energyinfo.energy_lifetime);
		 var total_energy=(energyinfo.energy_lifetime+energyinfo.energy_today)/1000000;
		 console.log(total_energy);
		 var current = total_energy;
		 
		
			console.log('previous zero');
			client.post('statuses/update', {status: 'Total energy =' +total_energy},  function(error, tweet, response) {
  		if(error) {
  		console.log(error);}
  		// console.log(tweet);  // Tweet body. 
  		// console.log(response);  // Raw response object. 
         });
		 
			
		
		});

		 
    }



	 
  });




	router.get('/management',function(req,res){

		Machine.find({},function(err,users){
			if(err) throw err;
			if(!users) {
				res.json({success: false,message: 'Data not found'});
			}  else {
				res.json({success:true,users: users});
			}


		});

	});



	router.delete('/management/:userid',function(req,res){

		var deletedUser = req.params.userid;
		console.log('value');
		console.log(req.params.userid);
		Machine.findOne({ userid: req.decoded.userid},function(err,userr){
			if(err) throw err;
			
				Machine.findOneAndRemove({ userid: deletedUser},function(err,user){

					console.log('inside find andremove');

					if(err) throw err; 
					res.json({success :true});
				});
			

		});


	});

	router.get('/edit/:id',function(req,res){

		var editUser = req.params.id;
				Machine.findOne({userid: req.decoded.userid }, function(err,userr){

					if (err) throw err;

					Machine.findOne({_id: editUser}, function(err,user){

						if (err) throw err;

						if (!user) {

							res.json({success: false, message:'No user found'});
						} else{

							res.json({success:true, user:user});
						}
					});
				});


	});


	router.put('/edit',function(req,res){

		console.log('Inside /edit routes api');
		var editUser	=	req.body._id;
		console.log(req.body.mail);
		console.log(req.body._id);
		if(req.body.mail) var newmail 				=	req.body.mail;
		if (req.body.address) var newaddress		= 	req.body.address;
		if (req.body.installdate) var newdate		=	req.body.installdate;
		if (req.body.countrycode) var newcountry	=	req.body.countrycode;
		if(req.body.userid) var newuserid			=	req.body.userid;
		if(req.body.inverter) var newinverter		=	req.body.inverter;
		if(req.body.nameplate) var newcapacity		=	req.body.nameplate;
		if(req.body.latitude) var newlatitude		=	req.body.latitude;
		if(req.body.longtitude) var newlongtitude 	=	req.body.longtitude;

		Machine.findOne({ userid : req.decoded.userid}, function(err,userr){
			console.log(req.decoded.userid);
			if (err) throw err;

			if(newmail){
					console.log('Inside newmail');

					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {
								console.log('sdsdsdsdsd');
								res.json({ success: false, message: 'No usereeee found'});
					} else {

						console.log('Data upppppdateedddd');
						user.email = newmail;
						user.save(function(err){
							if (err){
								res.json({ success: false, message: 'Please enter valid email'});
								 console.log(err);
							} else {

								res.json({success: true, message:'Mail has been updated'});
							}
						});
					}

					});
				}


				//address

				if(newaddress) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.address = newaddress;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Address has been updated'});
							}
						});
					}

					});

				}


				//install date

				if(newdate) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.installdate = newdate;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Date has been updated'});
							}
						});
					}

					});

				}

				//country code

				if(newcountry) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.countrycode = newcountry;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Country Code has been updated'});
							}
						});
					}

					});

				}


				//userid

				if(newuserid) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.userid = newuserid;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'User ID has been updated'});
							}
						});
					}

					});

				}



				//INVERTER

				if(newinverter) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.inverter = newinverter;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Inverter has been updated'});
							}
						});
					}

					});

				}


				//NAME PLATE CAPACITY

				if(newcapacity) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.nameplate = newcapacity;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Nameplate Capacity has been updated'});
							}
						});
					}

					});

				}


				//LATITUDE

				if(newlatitude) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.latitude = newlatitude;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Latitude has been updated'});
							}
						});
					}

					});

				}


				//LONGTITUDE
				if(newlongtitude) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.longtitude = newlongtitude;
						user.save(function(err){
							if (err){

								 console.log(err);
							} else {

								res.json({success: true, message:'Longtitude has been updated'});
							}
						});
					}

					});

				}



			

		});
 
	});

	return router; 
}//importing to server file


*/