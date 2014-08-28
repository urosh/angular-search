'use strict';

var PaginationController = function(DataModel, $scope){
	this.DataModel = DataModel;
	this.items = DataModel.getDisplayItems();
	var _this = this;
	$scope.$on('displayItemsSet', function(){
  	_this.updateShown(_this);
  });
};

PaginationController.prototype.updateItemsPerPage = function(e){
	console.log(e);
};

PaginationController.prototype.updateItemsPage = function(e){
	console.log(e)
};

PaginationController.prototype.talk = function(e){
	console.log('now we are talking: ' + e);
};

PaginationController.prototype.updateShown = function(_this){
	_this.items = _this.DataModel.getDisplayItems();
};



PaginationController.$inject = ['DataModel', '$scope'];