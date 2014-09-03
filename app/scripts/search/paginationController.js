'use strict';

var PaginationController = function(DataModel, $scope, display){
	this.DataModel = DataModel;
	this.items = DataModel.getDisplayItems();
	this.display = display;
	this.numberOfItems = 0;
	var _this = this;
	$scope.$on('displayTaken', function(){
  	_this.updateShown(_this);
  });
};


PaginationController.prototype.updateDisplay = function (currentPage, perPage){
	this.display.setDisplay(currentPage, perPage);
};

PaginationController.prototype.updateShown = function(_this){
	_this.items = _this.display.getDisplayWindow();
	_this.numberOfItems = _this.display.numberOfItems;
	_this.currentPage = _this.display.currentPage;
};



PaginationController.$inject = ['DataModel', '$scope', 'display'];