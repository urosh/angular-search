'use strict';

angular.module('starcSearchApp')
	.directive('myDropdown', function(){
	return {
		restrict: 'A',
		scope: {
			tools: '=',
			select: '&'
		},
		template: '<div class="wrapper-demo">' + 
		      	  '<div id="dd" ng-class="(active) ? \'wrapper-dropdown active\' : \'wrapper-dropdown \'"  ng-click="active=!active" tabindex="1">' +
        			'Select tools' +
        			'<ul  class="dropdown">' +
        			'<li ng-repeat="tool in tools"><a href="#" ng-click="select({e: tool.name })">{{ tool.name }}</a></li>'+
              
              '</ul></div></div>',
    link: function(scope){
    	console.log('we are now in a linking function');
    	scope.active = false;
    	
    } 

		
	};
});