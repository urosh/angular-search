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
	
	
	this.preloaderActive = false;

	// Initialize search data. Retrieve available collections and object types from the server
	this.initializeSearchData();
	
	


	

	


  // Run search 
  var that = this;
  

  $scope.$on('displayItemsSet', function(){
  	that.displayItems = DataModel.displayItems;
  });

  
  $scope.$watch('displayItems', function(){
  	console.log('display items changed');
  })
  
  // this.queryChange = function(query){
  	
  // };




}

SearchController.prototype.queryChange = function(query){
	var _this = this;
	if(query == ''){
  		_this.displayItems = _this.DataModel.getSearchResults();
  }else{
  		_this.displayItems = _this.$filter('filter')(_this.displayItems, _this.query);	
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

}


SearchController.$inject = ['searchService', 'CommonServices', 'DataModel', '$filter', '$scope'];
