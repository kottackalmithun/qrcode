angular.module('energyControllers',[])

.controller('energyCtrl',function($http){

	var app=this;
	this.engUser=function(){
		console.log('testing new button');
		$http.get('/api/energy').then(function(data){

		console.log(data.data.success);
	console.log(data.data.message);
	if(data.data.success){
		app.successMsg=data.data.message;
	}	
		}); 


	};
})


