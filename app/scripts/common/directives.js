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
		template: "<div ng-class=\"(loading) ? '' : 'ng-hide'\"><div  ng-class=\"(active) ? 'md-modal md-show' : 'md-modal'\" ng-include='commonCtrl.modal' ng-cloak></div><div class='md-overlay' ng-click='removeModal()'></div></div>",
		link: function(scope){
			
			//scope.active = true;
			scope.removeModal = function(){
				scope.active = false;	
				//scope.object = null;
				scope.title = '';
				scope.imageLocation = '#';
				scope.metadata = [];
			};

			
		}
	} 
})