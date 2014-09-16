'use strict';

function CollectionsController($scope, requestNotificationChannel, DataModel, CommonServices){
	$scope.items = [];
	
	

	requestNotificationChannel.onItemAddedToCollection($scope, function(id){
		/* ok now i need to get the item based on id*/
		var item = DataModel.getItemById(id);
		var itemExist  = false;

		for (var i = 0; i < $scope.items.length; i++) {
			if( $scope.items[i]['docID'] === id ){
				itemExist = true;
			}
		};
		if(!itemExist){
			$scope.items.push(item);
		}
		
	});

	$scope.showDetails = function(id){
		requestNotificationChannel.itemSelect(id);
	};

	$scope.removeItem = function(id){
		CommonServices.removeObjectFromCollection(this.items, 'docID', id);
	};

	$scope.clearCollection = function(option){
		if(option){
			$scope.items = [];
			$scope.dialog = false;
		}
		if($scope.items.length){
			$scope.dialog = true;
		}
	};

	$scope.saveCollection = function(option){
		$scope.dialog = false;
		$scope.saveDialog = true;
		if(option){
			console.log('ok we can now save the collection');
			console.log($scope.collection.text);
		}
	};


}

CollectionsController.$inject = ['$scope', 'requestNotificationChannel', 'DataModel', 'CommonServices'];