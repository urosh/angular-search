'use strict';


var SearchController = function(searchService, CommonServices, DataModel, $filter, $scope){
	
	this.searchService = searchService;
	this.CommonServices = CommonServices;
	this.DataModel = DataModel;
	this.$filter = $filter;
	this.$scope = $scope;


	this.collections = [];
	this.types = [];

	this.selectedTypes = [];
	this.selectedCollections = [];

	this.displayItems = [];
	this.shownItems = [];

	
	
	this.preloaderActive = false;

	// Initialize search data. Retrieve available collections and object types from the server
	this.initializeSearchData();
	
	var _this = this;
  $scope.$on('displayItemsSet', function(){
  	_this.updateDisplay(_this);
  });

  $scope.$on('shownItemsSet', function(){
  	_this.updateShown(_this);	
  });

  this.queryChange = function(query){
  	_this.filterContent(query, _this);
  };

};


SearchController.prototype.filterContent = function(query, _this){
	if(query.input == ''){
  		_this.displayItems = _this.DataModel.getResults();
  		
  }else{
  		_this.displayItems = _this.$filter('filter')(_this.displayItems, query.input);	
  }
  	
};

SearchController.prototype.initializeSearchData = function(){
	var _this = this;

	var searchInit = _this.searchService.initializeSearch();
  searchInit.then(function(res){
  	_this.collections = res.data.collections;
    _this.types = res.data.types;
  });
};

SearchController.prototype.typeSelected = function(e){
	this.CommonServices.addItemToArray(this.selectedTypes, e);
};

SearchController.prototype.collectionSelected = function(e){
	this.CommonServices.addItemToArray(this.selectedCollections, e);
};

SearchController.prototype.search = function(){
	
	var _this = this;
	_this.displayItems = [];
  		
	_this.preloaderActive = true;
	var queryData = {
    'search' : _this.query.input,
    'types' : _this.selectedTypes,
    'collections' : _this.selectedCollections 
	}
	_this.DataModel.setQueryData(queryData);

	var results = _this.searchService.runSearch();
	
	results.then(function(res){
		_this.preloaderActive = false;
	});

};

SearchController.prototype.updateDisplay = function(_this){
	_this.displayItems = _this.DataModel.getDisplayItems();
}




SearchController.$inject = ['searchService', 'CommonServices', 'DataModel', '$filter', '$scope'];
