/**
 * Created by urosdamnjanovic on 11/4/14.
 */
(function(){
  'use strict';

  angular.module('app.map')
    .factory('mapService', MapService);

  MapService.$inject = ['DataModel', 'display', '$filter'];

  function MapService(DataModel, display, $filter) {
    var service = {
      setMarkers : setMarkers,
      showMarkers : showMarkers,
      resetMarkers : resetMarkers
    };
    var id  = 0;
    function setMarkers() {

      var markers = [];
      var res = DataModel.getResults();
      for(var key in res){
        if(res[key].lat && res[key].lng && res[key].lat!== '0'){
          var add = true;
          for(var i in markers){
            if( markers[i].latitude === res[key].lat && markers[i].longitude === res[key].lng ) {
              add = false;
            }
          }

          if(add){
            id++;
            markers.push(
              {
                id: id,
                latitude: res[key].lat,
                longitude: res[key].lng,
                clicked: false

              }
            );
          }

        }
      }
      return markers;
    }


    function showMarkers(markers) {
      _.each(markers, function(marker){
        marker.onClicked = function(){
          if(marker.clicked){
            marker.icon=null;
            marker.clicked = false;
            display.resetDisplay();

          }else{
            _.each(markers, function(thatMarker){
              if( thatMarker!== marker && thatMarker.icon ){
                thatMarker.icon = null;
                thatMarker.clicked = false;
              }
            });
            marker.icon = 'images/green.png';
            marker.clicked = true;
            display.addDisplayData($filter('filter')(DataModel.getResults(), function(item){

              if(item.lat === marker.latitude && item.lng === marker.longitude){
                return true;
              }else{
                return false;
              }
            }), 'map');


          }
        };
      });
    }

    function resetMarkers(markers) {
      _.each(markers, function(marker){
        marker.clicked = false;
        marker.icon = null;
      });
      return markers;
    }
    return service;


  }
})()