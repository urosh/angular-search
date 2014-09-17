'use strict';

function CollectionsController($scope, requestNotificationChannel, DataModel, CommonServices, $timeout){
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
			closeDialog();
			if(option === 'ok'){
				$scope.items = [];
			}
		}else{
			if($scope.items.length){
				$scope.dialogText = "Are you sure you want to empty the collection?";
				$scope.dialogType = 'question';
				$scope.dialogActive = true;
			}	
		}
		
	};

	var closeDialog = function(){
		$scope.dialogActive = false;
		$scope.dialogType = 'none';
		$scope.dialogText="";
	};

	$scope.saveCollection = function(option){
		
		closeDialog();
		$scope.saveDialog = true;
		if(option){
			if(!$scope.collectionTitle){
				$scope.dialogText = 'Collection title cannot be empty. Please try again';
				$scope.dialogType = 'notification';
				$scope.dialogActive = true;
				$timeout(function(){
             closeDialog();
         }, 5000);
				
			}
			
		}
	};


}

CollectionsController.$inject = ['$scope', 'requestNotificationChannel', 'DataModel', 'CommonServices', '$timeout'];