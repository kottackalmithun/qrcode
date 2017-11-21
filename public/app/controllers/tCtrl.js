

angular.module("tControllers", [])
.controller('tCtrl', function($scope, $http, $interval, uiGridTreeViewConstants){
    var c1,c2,pa1,pa2,pac1,pac2,pr,pa,c11,c21,pa11,pa21,pac11,pac21,pr1;

 $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: true,
    showTreeExpandNoChildren: true,
    paginationPageSizes: [5, 10],
    isOpen:true,
    paginationPageSize: 5,
    columnDefs: [
               {
                    name: 'categoryName' ,  width: '30%' 
                },
                {
                    name: 'parentCategoryDesc' , width: '50%'
                }
                
        ]
  };
  $http.get('/api/tc').then(function(data1) {
    console.log("got the data");
    console.log(data1);
   // $scope.show = data.data;

    console.log('check here');
    console.log(data1.data[0].Parent+" "+ data1.data[0].con.CID+" "+ data1.data[0].pac.PacID+" "+data1.data[0].pal.PalID );
    
    c1 = data1.data[0].con.CID;
    c2 = data1.data[0].con.destination;
    pa1= data1.data[0].pal.PalID;
    pa2 = data1.data[0].pal.NoOfP;
    pac1 = data1.data[0].pac.PacID;
    pac2 = data1.data[0].pac.NoOfPro;
    pr = data1.data[0].ProID;
    
    c11 = data1.data[1].con.CID;
    c21 = data1.data[1].con.destination;
    pa11= data1.data[1].pal.PalID;
    pa21 = data1.data[1].pal.NoOfP;
    pac11 = data1.data[1].pac.PacID;
    pac21= data1.data[1].pac.NoOfPro;
    pr1 = data1.data[1].ProID;
    
  console.log('check here');
  //console.log(g);
var data=[
  {
    "categoryId": c1,
    "conceptId": 1,
    "categoryName": "Container1",
    "parentCategoryId": "container",
    "displayDescription": "",
    "sortOrderNumber": 1,
    "parentCategoryDesc": "ID:" +c1+ "  " + "Destination:" + " " +c2,
    "imageUrl": null,
    "channelId": null,
    "catLevel": 0,
    "isOpen": true,
    "categoryChildren": [
     
      {
        "categoryId": pa1,
        "conceptId": 1,
        "categoryName": "Palatte1",
        "parentCategoryId": c1,
        "TrackingDescription": "pa",
        "sortOrderNumber": 4,
        "parentCategoryDesc": "ID:"+pa1+"  " +"No:ofPackages:"+pa2,
        "imageUrl": null,
        "channelId": 0,
        "catLevel": 1,
        "isOpen": true,
        "categoryChildren": [
          {
            "categoryId": pac1,
            "conceptId": 1,
            "categoryName": "Package1",
            "parentCategoryId": pa1,
            "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
            "sortOrderNumber": 2,
            "parentCategoryDesc": "ID:"+pac1+"  "+"No.Of Products:"+pac2,
            "imageUrl": null,
            "channelId": 0,
            "catLevel": 2,
            "isOpen": true,
            "categoryChildren": [
            {
                "categoryId": pr,
                "conceptId": 1,
                "categoryName": "Product1",
                "parentCategoryId": pac1,
                "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
                "sortOrderNumber": 2,
                "parentCategoryDesc": "ID:" + pr,
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
        ],
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
  },
  {
    "categoryId": c11,
    "conceptId": 1,
    "categoryName": "Container2",
    "parentCategoryId": "container",
    "displayDescription": "",
    "sortOrderNumber": 1,
    "parentCategoryDesc": "ID:" +c11+ "  " + "Destination:" + " " +c21,
    "imageUrl": null,
    "channelId": null,
    "catLevel": 0,
    "isOpen": true,
    "categoryChildren": [
     
      {
        "categoryId": pa11,
        "conceptId": 1,
        "categoryName": "Palatte2",
        "parentCategoryId": c11,
        "TrackingDescription": "pa",
        "sortOrderNumber": 4,
        "parentCategoryDesc": "ID:"+pa11+"  " +"No:ofPackages:"+pa21,
        "imageUrl": null,
        "channelId": 0,
        "catLevel": 1,
        "isOpen": true,
        "categoryChildren": [
          {
            "categoryId": pac11,
            "conceptId": 1,
            "categoryName": "Package2",
            "parentCategoryId": pa11,
            "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
            "sortOrderNumber": 2,
            "parentCategoryDesc": "ID:"+pac11+"  "+"No.Of Products:"+pac21,
            "imageUrl": null,
            "channelId": 0,
            "catLevel": 2,
            "isOpen": true,
            "categoryChildren": [
            {
                "categoryId": pr1,
                "conceptId": 1,
                "categoryName": "Product2",
                "parentCategoryId": pac11,
                "displayDescription": "Topped with Monterey Jack, Cheddar and chopped bacon with spicy ranch dressing.",
                "sortOrderNumber": 2,
                "parentCategoryDesc": "ID:" + pr1,
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
        ],
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
 
  });


   });


