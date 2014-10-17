
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

	$scope.collectionSelected = function(e){
		CommonServices.addItemToArray($scope.selectedCollections, e);
	};

	$scope.typeSelected = function(e, i){
		CommonServices.addItemToArray($scope.selectedTypes, e);
	};


  requestNotificationChannel.onHistorySet($scope, function(query){
    $scope.query.input = query.search;

  });


	$scope.search = function(option){
		// search initialized
		requestNotificationChannel.searchStarted();
		var queryData = {
	    'types' : $scope.selectedTypes,
	    'collections' : $scope.selectedCollections 
		};
		if(option === 'browse'){
			queryData.search = '';
		}else{
			queryData.search = $scope.query.input;
	    
		}

		DataModel.setQueryData(queryData);
		var results = searchService.runSearch();
		
	};

	$scope.change = function(query){
		requestNotificationChannel.queryChange(query.input);
	};
			
};





SearchController.$inject = ['$scope', 'searchService', 'CommonServices', 'DataModel', 'requestNotificationChannel'];