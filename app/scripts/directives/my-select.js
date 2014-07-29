'use strict';

angular.module('starcSearchApp')
	.directive('mySelect', function(){
		return {
			restrict: 'A',
			templateUrl: 'views/templates/my-select.html' 
		};
	});