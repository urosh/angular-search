'use strict';


function SearchController(searchService, CommonServices, DataModel, $filter, $scope){
	
	this.collections = [];
	this.types = [];

	this.selectedTypes = [];
	this.selectedCollections = [];

	this.displayItems = [];
	this.searchResuls = [];
	this.resultMarkers = [];

	this.query = '';

	this.preloaderActive = false;


	var that = this;

	// Initialize search data. Retrieve available collections and object types from the server
	var searchInit = searchService.initializeSearch();
  searchInit.then(function(res){
  	that.collections = res.data.collections;
    that.types = res.data.types;
  });

  // Set selected types
  this.typeSelected = function(e){
    CommonServices.addItemToArray(this.selectedTypes, e);
  };
  
  // Set selected collections
  this.collectionSelected = function(e, i){
  	CommonServices.addItemToArray(this.selectedCollections, e);
  };

  // Run search 
  this.search = function(){
  	that.displayItems = [];
  		
  	this.preloaderActive = true;
  	var queryData = {
	    'search' : this.query,
	    'types' : this.selectedTypes,
	    'collections' : this.selectedCollections 
  	}
  	DataModel.setQueryData(queryData);

  	var results = searchService.runSearch(queryData);
  	results.then(function(res){
  		that.preloaderActive = false;
  		
  		that.displayItems = DataModel.displayItems;
  		that.searchResults = DataModel.searchResults;
  	});

  };

  $scope.$on('update:display:list', function(){
  	that.displayItems = DataModel.displayItems;
  })






}