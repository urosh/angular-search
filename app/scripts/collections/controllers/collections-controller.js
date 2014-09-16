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
			$scope.dialogActive = false;	
			if(option === 'ok'){
				$scope.items = [];
			}
		}else{
			if($scope.items.length){
				$scope.dialogText = "Are you sure you want to empty the collection?";
				$scope.dialogClasses = 'my-dialog question';
				$scope.dialogType = 'question';
				$scope.dialogActive = true;
			}	
		}
		
	};

	$scope.saveCollection = function(option){
		$scope.dialogActive = false;
		$scope.saveDialog = true;
		if(option){
			if(!$scope.collectionTitle){
				$scope.dialogText = 'Collection title cannot be empty. Please try again';
				$scope.dialogType = 'notification';
				$scope.dialogClasses = 'my-dialog notification';
				$scope.dialogActive = true;
				
			}
				
			
		}
	};


}

CollectionsController.$inject = ['$scope', 'requestNotificationChannel', 'DataModel', 'CommonServices'];