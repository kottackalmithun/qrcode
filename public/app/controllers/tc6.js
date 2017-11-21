

angular.module("tControllers", [])
.controller('tCtrl', function($scope, $http, $interval, uiGridTreeViewConstants){

  $http.get('/api/tc').then(function(data) {
    console.log("got the data");
    console.log(data);
    //$scope.showbook = data.data;

    console.log('check here');
    console.log(data.data[0].Parent+" "+ data.data[0].con.CID+" "+ data.data[0].pac.PacID+" "+data.data[0].pal.PalID );

 $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: true,
    showTreeExpandNoChildren: true,
    paginationPageSizes: [5, 10],
    paginationPageSize: 5,
    columnDefs: [
               {
                    name: 'categoryName'
                },
                {
                    name: 'parentCategoryName'
                },

                {
                  name: 'TrackingDescription'
                   
                },
                
        ]
  };

var data=[
  {
    "categoryId": data.data[0].con.CID,
    "conceptId": 1,
    "categoryName": "ContainerID 1",
    "parentCategoryId": data.data[0].con.CID,
    "displayDescription": "",
    "sortOrderNumber": 1,
    "parentCategoryName": "ContainerID 1",
    "imageUrl": null,
    "channelId": null,
    "catLevel": 0,
    "isOpen": false,
    "categoryChildren": [
     
      {
        "categoryId": data.data[0].pal.PalID,
        "conceptId": 1,
        "categoryName": "Palatte 1",
        "parentCategoryId": data.data[0].con.CID,
        "displayDescription": "Please see our Sips & Snacks menu for more choices.",
        "sortOrderNumber": 4,
        "parentCategoryName": "ContainerID 1",
        "imageUrl": null,
        "channelId": 0,
        "catLevel": 1,
        "isOpen": false,
        "categoryChildren": [
          {
            "categoryId": data.data[0].pac.PacID,
            "conceptId": 1,
            "categoryName": "Package 1",
            "parentCategoryId": data.data[0].pal.PalID,
            "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
            "sortOrderNumber": 2,
            "parentCategoryName": "PackageID 1",
            "imageUrl": null,
            "channelId": 0,
            "catLevel": 2,
            "isOpen": false,
            "categoryChildren": [],
            "categoryParent": null,
            "categoryScreen": null,
            "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
            "deletedBit": false,
            "entityStatus": 0,
            "validationErrors": null
          }
          
   
        ],
        "categoryParent": null,
        "categoryScreen": null,
        "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
        "deletedBit": false,
        "entityStatus": 0,
        "validationErrors": null
      }
   ]


var id=0;
var writeoutNode = function( childArray, currentLevel, dataArray ){
  childArray.forEach( function( childNode ){
  if ( childNode.categoryChildren.length > 0 ){
      childNode.$$treeLevel = currentLevel;
      id=childNode.categoryId;
     if(childNode.categoryId == childNode.parentCategoryId)
      {
        childNode.parentCategoryName='';
      }
   }
  else
  {
   if((id!=childNode.parentCategoryId) || (childNode.categoryId == childNode.parentCategoryId))
    {
      if(childNode.categoryId == childNode.parentCategoryId)
      {
        childNode.parentCategoryName='';
      }
      childNode.$$treeLevel = currentLevel;
    }
  }
    dataArray.push( childNode );
    writeoutNode( childNode.categoryChildren, currentLevel + 1, dataArray );
  });
};

$scope.gridOptions.data = [];
writeoutNode( data, 0, $scope.gridOptions.data );



 
  };



//     $scope.gridOptions = {
//     enableSorting: true,
//     enableFiltering: true,
//     showTreeExpandNoChildren: true,
//     paginationPageSizes: [5, 10],
//     paginationPageSize: 5,
//     columnDefs: [
//                {
//                     name: 'categoryName'
//                 },
//                 {
//                     name: 'parentCategoryName'
//                 },

//                 {
//                   name: 'TrackingDescription'
                   
//                 },
                
//         ]
//   };

// var data=[
//   {
//     "categoryId": 112,
//     "conceptId": 1,
//     "categoryName": "ContainerID 1",
//     "parentCategoryId": 112,
//     "displayDescription": "",
//     "sortOrderNumber": 1,
//     "parentCategoryName": "ContainerID 1",
//     "imageUrl": null,
//     "channelId": null,
//     "catLevel": 0,
//     "isOpen": false,
//     "categoryChildren": [
     
//       {
//         "categoryId": 8,
//         "conceptId": 1,
//         "categoryName": "PackageID 1",
//         "parentCategoryId": 112,
//         "displayDescription": "Please see our Sips & Snacks menu for more choices.",
//         "sortOrderNumber": 4,
//         "parentCategoryName": "ContainerID 1",
//         "imageUrl": null,
//         "channelId": 0,
//         "catLevel": 1,
//         "isOpen": false,
//         "categoryChildren": [
//           {
//             "categoryId": 20,
//             "conceptId": 1,
//             "categoryName": "ProductID 1",
//             "parentCategoryId": 8,
//             "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
//             "sortOrderNumber": 2,
//             "parentCategoryName": "PackageID 1",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
//           {
//             "categoryId": 20,
//             "conceptId": 1,
//             "categoryName": "ProductID 2",
//             "parentCategoryId": 8,
//             "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
//             "sortOrderNumber": 2,
//             "parentCategoryName": "PackageID 1",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
//           {
//             "categoryId": 20,
//             "conceptId": 1,
//             "categoryName": "ProductID 3",
//             "parentCategoryId": 8,
//             "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
//             "sortOrderNumber": 2,
//             "parentCategoryName": "PackageID 1",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
   
//         ],
//         "categoryParent": null,
//         "categoryScreen": null,
//         "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//         "deletedBit": false,
//         "entityStatus": 0,
//         "validationErrors": null
//       },
//       {
//         "categoryId": 9,
//         "conceptId": 1,
//         "categoryName": "PackageID 2",
//         "parentCategoryId": 112,
//         "displayDescription": "",
//         "sortOrderNumber": 5,
//         "parentCategoryName": "ContainerID 1",
//         "imageUrl": null,
//         "channelId": 0,
//         "catLevel": 1,
//         "isOpen": false,
//         "categoryChildren": [
//           {
//             "categoryId": 21,
//             "conceptId": 1,
//             "categoryName": "ProductID 1",
//             "parentCategoryId": 9,
//             "displayDescription": "Creamy potato soup topped with melted cheese, bacon and green onions.",
//             "sortOrderNumber": 1,
//             "parentCategoryName": "PackageID 2",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
//           {
//             "categoryId": 22,
//             "conceptId": 1,
//             "categoryName": "ProductID 2",
//             "parentCategoryId": 9,
//             "displayDescription": "Chicken breast in a seasoned broth, topped with Monterey jack and Cheddar cheese, cilantro and crispy tortilla strips. Served with a wedge of lime.",
//             "sortOrderNumber": 2,
//             "parentCategoryName": "PackageID 2",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
//           {
//             "categoryId": 23,
//             "conceptId": 1,
//             "categoryName": "ProductID 3",
//             "parentCategoryId": 9,
//             "displayDescription": "Fresh mixed greens, chopped hard-boiled eggs, tomatoes, bacon, Monterey Jack and Cheddar cheese and freshly made croutons. Served with your choice of dressing. Option to top with wood-fire grilled or crispy chicken.",
//             "sortOrderNumber": 4,
//             "parentCategoryName": "PackageID 2",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
          
         
          
//           {
//             "categoryId": 27,
//             "conceptId": 1,
//             "categoryName": "ProductID 3",
//             "parentCategoryId": 9,
//             "displayDescription": "",
//             "sortOrderNumber": 9,
//             "parentCategoryName": "PackageID 2",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           }
//         ],
//         "categoryParent": null,
//         "categoryScreen": null,
//         "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//         "deletedBit": false,
//         "entityStatus": 0,
//         "validationErrors": null
//       }
//     ],
//     "categoryParent": null,
//     "categoryScreen": null,
//     "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//     "deletedBit": false,
//     "entityStatus": 0,
//     "validationErrors": null
//   },

//   {
//     "categoryId": 96,
//     "conceptId": 1,
//     "categoryName": "ContainerID 2",
//     "parentCategoryId": 96,
//     "displayDescription": "",
//     "sortOrderNumber": 4,
//     "parentCategoryName": "ContainerID 2",
//     "imageUrl": null,
//     "channelId": null,
//     "catLevel": 0,
//     "isOpen": false,
//     "categoryChildren": [
      
//       {
//             "categoryId": 20,
//             "conceptId": 1,
//             "categoryName": "PackageID 3",
//             "parentCategoryId": 8,
//             "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
//             "sortOrderNumber": 2,
//             "parentCategoryName": "ContainerID 2",
//             "imageUrl": null,
//             "channelId": 0,
//             "catLevel": 2,
//             "isOpen": false,
//             "categoryChildren": [],
//             "categoryParent": null,
//             "categoryScreen": null,
//             "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//             "deletedBit": false,
//             "entityStatus": 0,
//             "validationErrors": null
//           },
//     ],
//     "categoryParent": null,
//     "categoryScreen": null,
//     "modifiedDate": "2015-07-21T15:29:53.2127788-04:00",
//     "deletedBit": false,
//     "entityStatus": 0,
//     "validationErrors": null
//   }
//   ]


// var id=0;
// var writeoutNode = function( childArray, currentLevel, dataArray ){
//   childArray.forEach( function( childNode ){
//   if ( childNode.categoryChildren.length > 0 ){
//       childNode.$$treeLevel = currentLevel;
//       id=childNode.categoryId;
//      if(childNode.categoryId == childNode.parentCategoryId)
//       {
//         childNode.parentCategoryName='';
//       }
//    }
//   else
//   {
//    if((id!=childNode.parentCategoryId) || (childNode.categoryId == childNode.parentCategoryId))
//     {
//       if(childNode.categoryId == childNode.parentCategoryId)
//       {
//         childNode.parentCategoryName='';
//       }
//       childNode.$$treeLevel = currentLevel;
//     }
//   }
//     dataArray.push( childNode );
//     writeoutNode( childNode.categoryChildren, currentLevel + 1, dataArray );
//   });
// };

// $scope.gridOptions.data = [];
// writeoutNode( data, 0, $scope.gridOptions.data );

    
});


// app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {



// }]);


