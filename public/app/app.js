angular.module('solarApp',['appRoutes','loginController','authServices','tControllers','trController','bpController','profileController','ngAnimate','regControllers','managementController','userServices','genQRController','energyControllers','scController','ngTouch', 'ui.grid', 'ui.grid.treeView', 'ui.grid.pagination'])

.config(function($httpProvider){

$httpProvider.interceptors.push('AuthInterceptors');

});



