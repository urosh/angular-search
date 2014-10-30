function PaginationController(DataModel, $scope, display, requestNotificationChannel){
	$scope.numberOfItems = 0;
	$scope.items = [];

	$scope.perShow = false;
	$scope.pagShow = false;
	$scope.firstShow = false;
	$scope.prevShow = false;
	$scope.lastShow = false;
	$scope.nextShow = false;
	
	$scope.paginationNumbers = [];
	
	$scope.currentPage = 1;
	$scope.itemsPerPage = 20;

	var numberOfPages = 0;
	
	requestNotificationChannel.onDisplayReady($scope, function(){
		initialize();
	});

	$scope.perPage = function(e){
		$scope.itemsPerPage = e;
		updatePagination();
	};

	$scope.itemPage = function(e){
		$scope.currentPage = e;
		updatePagination();
	};

	$scope.firstPage = function(){
		$scope.currentPage = 1;
		updatePagination();
	};

	$scope.prevPage = function(){
		if($scope.currentPage > 1){
			$scope.currentPage--;
			updatePagination();
		}
	};
	
	$scope.nextPage = function(){
		if($scope.currentPage < numberOfPages ){
			$scope.currentPage++;
			updatePagination();
			
		}
	};

	$scope.lastPage = function(){
		$scope.currentPage = numberOfPages;
		updatePagination();
	};


	$scope.perPageNumbers = [20, 40, 80];

	var initialize = function(){
  	$scope.items = display.getDisplayWindow();
    $scope.numberOfItems = display.getNumberOfItems();
		$scope.currentPage = display.getCurrentPage();

	};

	$scope.updateDisplay = function(currentPage, perPage){
		display.setDisplay(currentPage, perPage);
	}

	var updatePagination = function(){
    if ($scope.currentPage === 1){
	    $scope.firstShow = false;
		}
		$scope.firstShow = false;
		$scope.prevShow = false;
		$scope.lastShow = false;
		$scope.nextShow = false;

		numberOfPages = Math.ceil($scope.numberOfItems/$scope.itemsPerPage);

		$scope.paginationNumbers = [];
		if( $scope.numberOfItems === 0 ){
			$scope.perShow = false;
			$scope.pagShow = false;
		}
    if( $scope.numberOfItems > $scope.itemsPerPage ) {
      $scope.perShow = true;
			$scope.pagShow = true;

			for (var i = -2; i < 3; i++){
				if( ($scope.currentPage + i) > 0 && ($scope.currentPage + i) < numberOfPages+1){
		
					$scope.paginationNumbers.push(	$scope.currentPage + i);
					if (i == -1){
						$scope.firstShow = true;
						$scope.prevShow = true;
					}
				}
			}

					
			if($scope.currentPage + 3 < numberOfPages){
				$scope.lastShow = true;
				$scope.nextShow = true;
			}

		}

		$scope.updateDisplay($scope.currentPage, $scope.itemsPerPage);

	};

	$scope.$watchCollection('items', function() {
		if ($scope.items){
			updatePagination();
		}
	});

}

PaginationController.$inject = ['DataModel', '$scope', 'display', 'requestNotificationChannel'];