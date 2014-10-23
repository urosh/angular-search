'use strict';

function DropdownDirective(){
	
	function DropDownLink (scope, element, attrs, selectedToolsCtrl){
		//selectedToolsCtrl.itemSelected(scope.tools, 'map');
		scope.select = function(tool){
			//console.log(scope.tools);
      selectedToolsCtrl.itemSelected(scope.tools, tool);
	  }
	}

	return {
		restrict: 'E',
		scope: {},
		controller: DropDownController,
		require: '^selectedTools',
		template: '<div class="wrapper-demo">' + 
		      	  '<div id="dd" ng-class="(active) ? \'wrapper-dropdown active\' : \'wrapper-dropdown\'"  ng-click="active=!active" tabindex="1">' +
        			'Select tools' +
        			'<ul  class="dropdown">' +
        			'<li ng-repeat="tool in tools"><a href="#" ng-click="select(tool.name)">{{ tool.name }}</a></li>'+
              '</ul></div></div>',
    link: DropDownLink
    
	}
}