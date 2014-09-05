'use strict';

function PreloaderDirective(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		controller: function($scope, requestNotificationChannel){
			$scope.preloaderActive = false;
			requestNotificationChannel.onSearchStarted($scope, function(){
				$scope.preloaderActive = true;
			});
			requestNotificationChannel.onSearchResultsReady($scope, function(){
				$scope.preloaderActive = false;
			});
		},
		template: '<div ng-show="preloaderActive" ><img  src="images/preloader3.gif"/></div>',
		link: function(scope){
			
		}
	}
};
