'use strict';

var searchModule = angular.module('starcSearchApp');

searchModule.directive('preloader', function(){
	return {
		restrict: 'A',
		transclude: 'true',
		template: '<div ><img ng-transclude src="images/preloader3.gif"/></div>'
	}
});

searchModule.directive('myModal', function(){
	return{
		restrict: 'A',
		template: "<div ng-class=\"(active) ? 'md-modal md-show' : 'md-modal'\" ng-include='commonCtrl.modal'></div><div class='md-overlay' ng-click='removeModal()'></div>",
		link: function(scope){
			scope.$on('itemClicked', function(){
  			//$scope.active = true;
  			console.log('we are managing this inside directive');
  			// ok so i need to set classes 
  		})
			//scope.active = true;
			scope.removeModal = function(){
				scope.active = false;	
			};

			
		}
	} 
})