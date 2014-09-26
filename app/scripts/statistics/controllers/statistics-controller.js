function StatisticsController($scope, searchService, DataModel, requestNotificationChannel){
	var stat = searchService.getStats();
	$scope.numberOfObject = 0;
	$scope.collections = [];
	$scope.active = true;
	$scope.stats = [];
	$scope.types = [];
	stat.then(function(res){
		$scope.active = false;
		$scope.stats = res.data;	
		
	//	$scope.types = [{'type': 'some', 'name': 'nm'}, {'type': 'sm2', 'name': 'nm2'}];
	});

	$scope.search = function(type, value){
		DataModel.setQueryData({
			'search' : '',
      'collections': (type === 'collections' ? [value] : []),
      'types': (type === 'types' ? [value]: [])
		});
		requestNotificationChannel.searchStarted();
		searchService.runSearch();

		
	};


};

StatisticsController.$inject = ['$scope', 'searchService', 'DataModel', 'requestNotificationChannel'];
