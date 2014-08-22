'use strict';

var searchModule = angular.module('starcSearchApp');

searchModule.directive('preloader', function(){
	return {
		restrict: 'A',
		transclude: 'true',
		template: '<div ><img ng-transclude src="images/preloader3.gif"/></div>'
	}
})