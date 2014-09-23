function StatisticsController($scope, searchService){
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
	})

};

StatisticsController.$inject = ['$scope', 'searchService'];
