'use strict';

function ToolsDirective(){
	return {
		restrict: 'E',
		scope: {},
		transclude: true,
		 
		template: '<div class="menu-container">'+
      				'<div><div ng-transclude></div></div> ' +
							'<div class="dropdown-items-container"><div class="dropdown-item" ng-repeat="tool in tools">' +
							'<div class="item-name">{{ tool.name }}</div>'+
							'<div class="icon-remove" ng-click="remove(tool.name)"></div>'+
							'</div></div></div>',
		controller: ToolsController,
								
           
	}
};

