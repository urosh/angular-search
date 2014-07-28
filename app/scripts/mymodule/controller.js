angular.module('myModule',[]);

angular.module('myModule')
	.controller('myCtrl', ['$scope', function($scope){
		this.variable = 'myTest';
	}]);
