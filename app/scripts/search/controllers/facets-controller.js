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
		
		/*_this.display.addDisplayData(_this.$filter('filter')(_this.DataModel.searchResults, function(item){
		  if(item.lat == marker.latitude && item.lng == marker.longitude){
		    return true;
      }else{
        false;
      }
    }), 'map');*/

		
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

		/*updateDisplay();
		if( type === 'collection' ){
			$scope.collections[index].selected = !$scope.collections[index].selected;
			
			_.each(display.getDisplayData(), function(item){
				if($scope.collections.length){
					_.each($scope.collections, function(coll){
						if(item === coll){
							newDisplayData.push(item);
						}
					})
					display.addDisplayData(newDisplayData, 'filter');
				}else{
					display.resetDisplay();
				}
				
			});
			
		
		}else{
			$scope.types[index].selected = !$scope.types[index].selected;
		}*/
	}


}

FacetController.$inject = ['$scope', 'requestNotificationChannel', 'DataModel', 'display'];