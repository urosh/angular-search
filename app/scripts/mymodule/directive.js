angular.module('myModule')
	.directive('mySecondDirective', function(){
		return {
			restrict: 'A',
			template: '<div>{{ ctrl2.variable }}</div>'
		}
	})