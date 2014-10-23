'use strict';

function ToolsController($scope, DataModel){
	$scope.tools = DataModel.getSelectedTools();

  //$scope.tools = [{'id': 1, 'name': "map", 'template': "scripts/map/template.tpl.html"}];

	$scope.remove = function(tool){
		DataModel.removeTool(tool);
		$scope.tools = DataModel.getSelectedTools();
	};

	this.itemSelected = function(tools, tool){
		DataModel.selectTool(tools, tool);
		
		$scope.tools = DataModel.getSelectedTools();
	}

  //DataModel.selectTool($scope.tools, 'map');

};

ToolsController.$inject = ['$scope', 'DataModel'];

