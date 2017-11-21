angular.module('scController',[])

.controller('scCtrl',function($http,$scope,$location){

     let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

       
        console.log('inside scanner controler');
        if (data.data.success) {
        scanner.addListener('scan', function (id) {
  $http.post('/api/sc').then(function(data){

        //alert(content);
        // if (window.confirm('If you click "ok" you would be redirected . Cancel will load this website ')) 
        //   {
        //   window.location.href='http://localhost:3030/track/'+id;
        //   //track?id='+content
        // };
        $scope.showdata = id;
       console.log(id);
        console.log('hello from scan');
  });

      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.log('No cameras found.');
        }
      }).catch(function (e) {
        console.log(e);
      });
                    
    } else {
            console.log('some error from scanner api');      
                }

  });

 




//Hi all, I'm new to MEAN Stack and is trying to do a simple project on it. I was trying to read 
// a QR code and get the value of that QR code(which is an ID) and use that ID to fetch ID details from db.
//  I have a controller where I wrote the code for scanning the QR code and then redirect the user to a new page where the details
//  will be displayed. 

//   window.location.href='http://localhost:3030/track/'+id;

//   On the redirecting page's controller I used the routeParams to get the id 

// angular.module('trController',[])
// .controller('trCtrl',function($http,$routeParams){
//    var id = $routeParams.id; 
//    console.log('idddddd  '+id);
//      $http.get('/api/track/'+id).then(function(data){
//        console.log('data displayed');
//     });
// });

// and passed it to my api.js file where i wrote the remaining code

//  router.get('/track/:id',function(req,res){
//     var ID = req.params.id;
//     console.log('fetched ID:'+ID);
//   });

// My router code is 

//   .when('/track/:id',{
//     templateUrl : 'app/views/pages/track.html',
//     controller: 'trCtrl',
//     controllerAs: 'track'

//   })




