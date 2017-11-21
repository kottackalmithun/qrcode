angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider,$locationProvider){
	
	$routeProvider

	.when('/',{
		templateUrl:'app/views/pages/login.html'
	})

	.when('/profile',{
		templateUrl:'app/views/pages/profile.html',
		controller: 'profileCtrl',
		controllerAs: 'profile'

	})
	.when('/batpay',{
		templateUrl:'app/views/pages/qrcode.html',
		controller: 'bpCtrl',
		controllerAs: 'bp'

	})
		.when('/view',{
		templateUrl:'app/views/pages/track.html',
		controller: 'tCtrl',
		controllerAs: 'tc'

	})
	// .when('/track',{
	// 	templateUrl:'app/views/pages/track.html',
	// 	controller: 'trCtrl',
	// 	controllerAs: 'track'

	// })
	.when('/qrc',{
        templateUrl:'app/views/pages/qr.html',
        controller: 'gQRCtrl',
        controllerAs: 'gqr'
    })

	.when('/register',{
		templateUrl:'app/views/pages/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})
	
	.when('/scr',{

        templateUrl: 'app/views/pages/scanner.html',
        controller: 'scCtrl',
        controllerAs: 'sc'
    })
	// 	.when('/track',{
	// 	templateUrl:'app/views/pages/track.html',
	// 	controller: 'trackCtrl',
	// 	controllerAs: 'track'
	// })

	.when('/energy',{
		templateUrl:'app/views/pages/energy.html',
		controller: 'energyCtrl',
		controllerAs: 'energy'
	})


	.when('/management',{
		templateUrl : 'app/views/pages/medit.html',
		controller :'managementCtrl',
		controllerAs:'management',
		authenticated : true,
		permission: true

	})


	.when('/track/:id',{
		templateUrl : 'app/views/pages/track.html',
		controller: 'trCtrl',
		controllerAs: 'track'

	})

	.when('/logout',{

		templateUrl: 'app/views/pages/logout.html'
	})

	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});


});
