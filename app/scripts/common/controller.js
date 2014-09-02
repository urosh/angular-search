'use strict';


angular.module('starcSearchApp')
	.controller('CommonCtrl', ['$scope', function($scope){
		$scope.active = false;
		this.modal = 'scripts/common/templates/modal.tpl.html';
		var _this = this;
		$scope.$on('itemClicked', function(e, docID){
  		$scope.active = true;
  		// this i can do from controller i need to retrieve object based on id. 
  		
  		// ok so i need to set classes 
  	})
	}]);