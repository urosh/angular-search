'use strict';

function CollectionsController($scope, $timeout, requestNotificationChannel, DataModel, CommonServices, collectionsService ){
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
				setDialog('Are you sure you want to empty the collection?', 'question');
				
			}	
		}
		
	};

	var closeDialog = function(){
		$scope.dialogActive = false;
		$scope.dialogType = 'none';
		$scope.dialogText="";
	};

	var setDialog = function(text, type){
		$scope.dialogText = text;
		$scope.dialogType = type;
		$scope.dialogActive = true;
		if(type === 'notification'){
			$timeout(function(){
	      closeDialog();
	    }, 5000);
		}
	};


	$scope.saveCollection = function(option){
		
		closeDialog();
		$scope.saveDialog = true;
		if(option){
			if(!$scope.collectionTitle){
				setDialog('Collection title cannot be empty. Please try again', 'notification')
			}else if(!$scope.items.length){
				setDialog('No items selected. Please add objects to collection', 'notification');
			}
			else{
				collectionsService.saveCollection($scope.collectionTitle, $scope.collectionText, $scope.items).then(function(res){
		    	if(res.data === 'success'){
		    		setDialog('Collection saved.', 'notification');
		    	}else{
		    		setDialog('There was problem saving the collection. Please try again.', 'notification');
		    	}
    	
    		});
				

			}
			
		}
	};


}

CollectionsController.$inject = ['$scope',  '$timeout', 'requestNotificationChannel', 'DataModel', 'CommonServices', 'collectionsService'];