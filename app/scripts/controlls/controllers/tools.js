'use strict';

function ToolsController($scope, DataModel){
	$scope.tools = DataModel.selectedTools;

	
	$scope.remove = function(tool){
		DataModel.removeTool(tool);
	};

	this.itemSelected = function(tools, tool){
		DataModel.selectTool(tools, tool);
		
	}

};

ToolsController.$inject = ['$scope', 'DataModel'];

