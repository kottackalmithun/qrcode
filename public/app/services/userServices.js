angular.module('userServices',[])

.factory('Machine',function($http){

userFactory = {};



userFactory.getUser = function(id){

	return $http.get('/api/edit/' + id);

};





userFactory.getID = function(id){
	console.log('yess');
	console.log(id); 

	return $http.get('/api/track/' + id);
};

userFactory.editUser = function(id){
	console.log('Inside factory');

	return $http.put('/api/edit', id);
};

return userFactory;


});