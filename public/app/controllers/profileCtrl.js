angular.module('profileController',[])

.controller('profileCtrl',function($http,$scope,$location, $timeout){



  var app = this;
//   app.gen = function(){
//               // $timeout(function() {
//               //           $location.path('/qrc');
//               //       }, 2000);

//  $http.post('/api/gqr').then(function(data){
//         console.log('batch generation of qr done');
//         });
// };


  app.scan = function(){
     $timeout(function() {
                        $location.path('/scr');
                    }, 2000);
  }; 


 

  app.batch = function(){
     $timeout(function() {
                        $location.path('/qrc');
                    }, 2000);
  }; 





 app.batpay = function(){
     $timeout(function() {
                        $location.path('/batpay');
                    }, 2000);
  }; 

 app.view = function(){
     $timeout(function() {
                        $location.path('/view');
                    }, 2000);
  };  


  });






