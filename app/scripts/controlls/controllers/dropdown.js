'use strict';

function DropDownController ($scope, ControllsService,  DataModel){
	$scope.tools = [];
  var promise = ControllsService.getTools();
	
  promise.then(function(res){
    $scope.tools = res.data;
  });

};


DropDownController.$inject = ['$scope', 'ControllsService', 'DataModel'];
	

