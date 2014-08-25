function MapController(DataModel, $scope, $filter) {
	this.map = {
      center: {
          latitude: 35.1,
          longitude: 33.3
      },
      zoom: 8
  };
  
  this.markers = DataModel.resultMarkers;
  	
  var that = this;
  
  $scope.$on('data:ready', function(){
			
		_.each(DataModel.resultMarkers, function(marker){
		  marker.onClicked = function(){
		  	if(marker.clicked){
		    	marker.icon=null;
		      DataModel.setDisplayItems( DataModel.searchResults );
		    	   
		      marker.clicked = false;
		    }else{
		      _.each(that.resultMarkers, function(thatMarker){
		        if( thatMarker!=marker && thatMarker.icon ){
		          thatMarker.icon = null;
		        }
		      })
		      marker.icon = 'images/green.png';
		      DataModel.setDisplayItems($filter('filter')(DataModel.searchResults, function(item){
		        
		        if(item.lat == marker.latitude && item.lng == marker.longitude){
		          
		          return true;
		        }else{
		          false;
		        }
		      }));
					marker.clicked = true;
		    
		    }
		    
		    
		  }
		});
	});


			
	//********
	






}