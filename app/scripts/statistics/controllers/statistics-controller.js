function StatisticsController($scope, searchService){
	var stat = searchService.getStats();
	$scope.numberOfObject = 0;
	$scope.types = [];
	$scope.collections = [];
	$scope.active = true;

	stat.then(function(res){
		$scope.active = false;
	})

};

StatisticsController.$inject = ['$scope', 'searchService'];
