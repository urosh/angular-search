'use strict';


angular.module('my-controlls', []);




angular.module('my-controlls')
	.controller('ControllsController', ControllerFunction);

angular.module('my-controlls')
	.service('ControllsService', ControllsServiceFunction);

angular.module('my-controlls')
	.directive('selectedItems', SelectedItemsDirective);


angular.module('my-controlls')
	.directive('myDropdown', ControllsDirective);



	


// angular.module('controlls')
// 	.factory('controllFactory', ['', function(){
// 		return function (){
			
// 		};
// 	}])