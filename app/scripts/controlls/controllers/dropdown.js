'use strict';

function DropDownController ($scope, ControllsService,  DataModel){
	$scope.tools = [];
  var promise = ControllsService.getTools();
	
  promise.then(function(res){
    $scope.tools = res.data;
    DataModel.selectTool($scope.tools, 'map');
  });

};


DropDownController.$inject = ['$scope', 'ControllsService', 'DataModel'];
	

