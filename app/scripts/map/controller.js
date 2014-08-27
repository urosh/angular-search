'use strict';

var MapController = function(DataModel, $scope, $filter) {
	this.DataModel = DataModel;
	this.$scope = $scope;
	this.$filter = $filter;
	this.markers = [];
	
	this.map = {
    center: {
        latitude: 35.1,
        longitude: 33.3
    },
    zoom: 8
  };
  
  //this.markers = this.DataModel.resultMarkers;
  var _this = this;
  $scope.$on('searchResultsSet', function(){
  	_this.setMarkers(_this);	
  });
  $scope.$on('displayItemsSet', function(){
  	_this.showMarkers(_this);
  });


};

MapController.prototype.setMarkers = function(_this){
	var res = _this.DataModel.getResults();
	
	_this.markers = [];

	for(var key in res){
    if(res[key].lat && res[key].lng && res[key].lat!='0'){
      var add = true;
      for(var i in _this.markers){
        if( _this.markers[i]['latitude'] === res[key].lat && _this.markers[i]['longitude'] === res[key].lng ) {
          add = false;
        }
      }
      if(add){
        _this.markers.push(
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
};



MapController.prototype.showMarkers = function(_this){
	
	_.each(_this.markers, function(marker){
		  marker.onClicked = function(){
		  	if(marker.clicked){
		    	marker.icon=null;
		      _this.DataModel.setDisplayItems( _this.DataModel.searchResults );
		    	   
		      marker.clicked = false;
		    }else{
		      _.each(_this.markers, function(thatMarker){
		        if( thatMarker!=marker && thatMarker.icon ){
		          thatMarker.icon = null;
		        }
		      })
		      marker.icon = 'images/green.png';
		      _this.DataModel.setDisplayItems(_this.$filter('filter')(_this.DataModel.searchResults, function(item){
		        
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
};


MapController.$inject = ['DataModel', '$scope', '$filter'];
