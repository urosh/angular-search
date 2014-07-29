'use strict';

angular.module('starcSearchApp')
	.directive('selectedItems', function(){
		return {
			restrict: 'A',
			scope: {
				tools: '=',
				remove:'&'
			},
			
			template: '<div class="dropdown-item" ng-repeat="tool in tools">'+
								'<div class="item-name">{{ tool.name }}</div>'+
								'<div class="icon-remove" ng-click="remove({e: tool.name})"></div>'+
								'</div>'
								
           
		};
	});