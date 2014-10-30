'use strict';

var mapModule = angular.module('mapModule', ['google-maps']);

mapModule.controller('mapController', MapController);

function MapController(DataModel, $scope, $filter, display, requestNotificationChannel) {
	this.DataModel = DataModel;
	this.$scope = $scope;
	this.$filter = $filter;
	this.markers = [];
	this.display = display;
	this.map = {
    center: {
        latitude: 35.1,
        longitude: 33.3
    },
    zoom: 8
  };
  
  var _this = this;
  
  _this.setMarkers(_this);	
  _this.showMarkers(_this);
  
  requestNotificationChannel.onSearchResultsReady($scope, function(){
  	_this.setMarkers(_this);	
  	_this.showMarkers(_this);
  
  });
  
  requestNotificationChannel.onDisplayReady($scope, function(item){
  	if(item === 'filter'){
  		_this.resetMarkers();
  		
  	}
  });


};

MapController.prototype.resetMarkers = function(){
	_.each(this.markers, function(marker){
		marker.clicked = false;
		marker.icon = null;
	});
}

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
		    	marker.clicked = false;
		      _this.display.resetDisplay();   
		     
		    }else{
		      _.each(_this.markers, function(thatMarker){
		        if( thatMarker!=marker && thatMarker.icon ){
		          thatMarker.icon = null;
		          thatMarker.clicked = false;
		        }
		      })
		      marker.icon = 'images/green.png';
		      marker.clicked = true;
		      _this.display.addDisplayData(_this.$filter('filter')(_this.DataModel.getResults(), function(item){
		        
		        if(item.lat == marker.latitude && item.lng == marker.longitude){

		          return true;
		        }else{
		          false;
		        }
		      }), 'map');
					
		    
		    }
			}
		});
};


MapController.$inject = ['DataModel', '$scope', '$filter', 'display', 'requestNotificationChannel'];

