


angular.module("regControllers", [])
.controller('regCtrl', function($http, $location, $timeout){
	var app = this;

 this.regUser = function(regData) {
     
        app.loading = true; // Activate bootstrap loading icon
        app.errorMsg = false;

		console.log('Form Submitted');

				$http.post('/api/register',this.regData).then(function(data){
				console.log(data.data.success);
				console.log(data.data.message);
				                if (data.data.success) {
                    app.loading = false; // Stop bootstrap loading icon
                     // Set class for message
                    app.successMsg = data.data.message + '...Redirecting'; // If successful, grab message from JSON object and redirect to login page
                    // Redirect after 2000 milliseconds (2 seconds)
                    $timeout(function() {
                        $location.path('/home');
                    }, 2000);
                } else {
                    app.loading = false; app.disabled = false; // If error occurs, remove disable lock from form
                   
                    app.errorMsg = data.data.message; // If not successful, grab message from JSON object
                }
            });
        } ;
	
});


