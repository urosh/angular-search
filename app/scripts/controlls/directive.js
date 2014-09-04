'use strict';





function ControllsDirective(){


	function DropDownController ($scope, ControllsService,  DataModel){
		
		$scope.tools = [];
	  var promise = ControllsService.getTools();
		
	  promise.then(function(res){
	    $scope.tools = res.data;
	  });

	};
	

	function DropDownLink (scope, element, attrs, selectedToolsCtrl){
		scope.select = function(tool){
	  	selectedToolsCtrl.itemSelected(scope.tools, tool);
	  }
	}

	DropDownController.$inject = ['$scope', 'ControllsService', 'DataModel'];

	return {
		restrict: 'E',
		scope: {},
		controller: DropDownController,
		require: '^selectedTools',
		template: '<div class="wrapper-demo">' + 
		      	  '<div id="dd" ng-class="(active) ? \'wrapper-dropdown active\' : \'wrapper-dropdown \'"  ng-click="active=!active" tabindex="1">' +
        			'Select tools' +
        			'<ul  class="dropdown">' +
        			'<li ng-repeat="tool in tools"><a href="#" ng-click="select(tool.name)">{{ tool.name }}</a></li>'+
              '</ul></div></div>',
    link: DropDownLink
    
	}
};


function SelectedItemsDirective(){
	
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

