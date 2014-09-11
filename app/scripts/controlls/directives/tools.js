'use strict';

function ToolsDirective(){
	return {
		restrict: 'E',
		scope: {},
		transclude: true,
		 
		templateUrl: 'scripts/controlls/templates/tools-select.tpl.html',
		controller: ToolsController,
								
           
	}
};

