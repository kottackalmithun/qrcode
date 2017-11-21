angular.module('loginController',['authServices'])

.controller('loginCtrl',function(Auth,$timeout,$location,$rootScope){
	var app = this;
	app.loadme =false;

	$rootScope.$on('$routeChangeStart',function(){
		if(Auth.isLoggedIn()){
		console.log('Success: User logged in.');
		app.isLoggedIn = true;
		Auth.getUser().then(function(data){
			console.log(data.data.username);
			app.username = data.data.username;
			app.loadme =true;
		});
		} else{
		console.log('User logged out '); 
		app.isLoggedIn = false;
		app.username = '';
		app.loadme =true;
	}


	});

	

	this.doLogin = function(loginData){
			
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				app.loading = false;
				//Create success message
				app.successMsg = data.data.message + '...Redirecting';
				//Redirect to home page
				$timeout(function(){
					$location.path('/profile');
					app.loginData  = '';
					app.successMsg = false;

				},2000);
			} else{
				//create an error message
				app.loading = false;
				app.disabled = false;
				app.errorMsg  = data.data.message;
			}


		});
		
	};

	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},2000);

	};

});



