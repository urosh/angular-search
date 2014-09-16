
function SearchController($scope, searchService, CommonServices, DataModel, requestNotificationChannel){
	$scope.selectedTypes = [];
	$scope.selectedCollections = [];
	$scope.types = [];
	$scope.collections = [];
	$scope.displayItems = [];

	$scope.initializeSearchData = function(){
		var searchInit = searchService.initializeSearch();
	  searchInit.then(function(res){
	  	$scope.collections = res.data.collections;
	    $scope.types = res.data.types;
	  });
	};

	$scope.collectionSelected = function(){
		CommonServices.addItemToArray($scope.selectedCollections, e);
	}

	$scope.typeSelected = function(e, i){
		CommonServices.addItemToArray($scope.selectedTypes, e);
	}

	


	$scope.search = function(){
		// search initialized
		requestNotificationChannel.searchStarted();
		
		var queryData = {
	    'search' : $scope.query.input,
	    'types' : $scope.selectedTypes,
	    'collections' : $scope.selectedCollections 
		};

		DataModel.setQueryData(queryData);
		var results = searchService.runSearch();
		
	};

	$scope.change = function(query){
		requestNotificationChannel.queryChange(query.input);
	};
			
};





SearchController.$inject = ['$scope', 'searchService', 'CommonServices', 'DataModel', 'requestNotificationChannel'];