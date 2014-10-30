function FacetController($scope, requestNotificationChannel, DataModel, display){
	requestNotificationChannel.onSearchResultsReady($scope, function(){
		$scope.active = true;
  	$scope.types = [];
  	$scope.collections = [];

  	_.each(DataModel.getResultTypes(), function(item){

  		$scope.types.push({'name': item, 'selected': false});
  	});

  	_.each(DataModel.getResultCollections(), function(item){
  		$scope.collections.push({'name': item, 'selected': false});
  	});
	
  	$scope.selectedTypes = [];
  	$scope.selectedCollections = [];
  
  });
	var updateDisplay = function(){
		var newDisplayData = [];
		if(!$scope.selectedTypes.length && !$scope.selectedCollections.length){
			display.resetDisplay();
		}else{
			_.each(display.getDisplayData(), function(item){
			var add = false;
		
			_.each($scope.selectedCollections, function(collection){
				if(item.collection === collection.name) { 	add = true;	}
			});

			_.each($scope.selectedTypes, function(type){
				if(item.type === type.name) { add = true; }
			});

			if(add) { newDisplayData.push(item);	}
			
			});
			display.addDisplayData(newDisplayData, 'facets');	
		}
		


		
	};

  $scope.filterFacet = function(type, index){
  	
  	var collectionName = '';
  	
  	if(type === 'collections'){
  		collectionName = 'selectedCollections'	
  	}else{
  		collectionName = 'selectedTypes';	
  	}
  	var currentStatus = $scope[type][index].selected;
  	$scope[type][index].selected = !$scope[type][index].selected;
  	var add = true;
  	var removeIndex = -1;
  	_.each($scope[collectionName], function(item, i){
			if(item['name'] === $scope[type][index]['name']){
				add = false;
				if(currentStatus){
					removeIndex = i;
				}
			}
		});
  	if(currentStatus && removeIndex > -1){
  		$scope[collectionName].splice(removeIndex, removeIndex+1);
		}
		
		if(add){
			$scope[collectionName].push($scope[type][index]);
		}
		
		updateDisplay();


	};


}

FacetController.$inject = ['$scope', 'requestNotificationChannel', 'DataModel', 'display'];