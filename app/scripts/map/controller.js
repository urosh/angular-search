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
  // Map 
	this.setMarkers = function(res){
    
    

  };


  $scope.$on('data:ready', function(){

		var res = DataModel.searchResults;
		that.markers = DataModel.resultMarkers;

  	for(var key in res){
      if(res[key].lat && res[key].lng && res[key].lat!='0'){
        var add = true;
        for(var i in that.markers){
          if( that.markers[i]['latitude'] === res[key].lat && that.markers[i]['longitude'] === res[key].lng ) {
            add = false;
          }
        }
        if(add){
          that.markers.push(
            {
              id: key, 
              latitude: res[key].lat, 
              longitude: res[key].lng,
              clicked: false,
              
            }
          );  
        }
        
      }
    };


		_.each(DataModel.resultMarkers, function(marker){
		  marker.onClicked = function(){
		  	if(marker.clicked){
		    	marker.icon=null;
		      DataModel.setDisplayItems( DataModel.searchResults );
		    	   
		      marker.clicked = false;
		    }else{
		      _.each(DataModel.resultMarkers, function(thatMarker){
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