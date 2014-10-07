function CropController($scope, requestNotificationChannel, CommonServices){
	requestNotificationChannel.onItemAnnotate($scope, function(id){
		var object = CommonServices.getItem(id).then(function(res){
			$scope.imageSource = res.data.imageLocation;
      $scope.docID = id;
			$scope.imageAdded = true;
			$scope.imageW = 350;
			$scope.imageH = parseInt ( 350  * parseInt(res.data.imageHeight) / parseInt(res.data.imageWidth) );
			$scope.initializeMask();

		});
	});
};

CropController.$inject = ['$scope', 'requestNotificationChannel', 'CommonServices'];
