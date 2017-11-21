// app.get('/home', function(req, res) {
//     //get user information based on the id url parameter
//     User.findById(req.query.id, function(err, doc) {
//             res.render('home.ejs', {
//                 id     : doc._id
//             });     
//     });
// });
//    router.get('/track/:id',function(req,res){

//     var PID = req.params.id;
//         Machine.findOne({userid: req.decoded.userid }, function(err,userr){

//           if (err) throw err;

//           Machine.findOne({_id: editUser}, function(err,user){

//             if (err) throw err;

//             if (!user) {

//               res.json({success: false, message:'No user found'});
//             } else{

//               res.json({success:true, user:user});
//             }
//           });
//         });


//   });

// angular.module('trController',[])

// .controller('trCtrl',function($http,$routeParams){
// 		var id = $routeParams.id; 
// 		console.log('idddddd  '+id);
// 	   //  $http.get('/api/track/'+id).then(function(data){
// 				// console.log('inside track controller');
				
//     //         });
// });


// Machine


angular.module('trController',[])

.controller('trCtrl',function($http,$routeParams, Machine){
	console.log('hgftftyvtycgcfhc');
	Machine.getID($routeParams.id).then(function(data){
			if(data.data.success) {

				console('success');

			} else {

			console.log('error');
			}

		});

		// var id = $routeParams.id; 
		// console.log('idddddd  '+id);
	   //  $http.get('/api/track/'+id).then(function(data){
				// console.log('inside track controller');
				
    //         });
});