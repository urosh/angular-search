(function(){
  'use strict';


  angular.module('app.map')
    .controller('mapController', MapController);

  MapController.$inject = ['DataModel', '$scope', '$filter', 'display', 'requestNotificationChannel'];

  function MapController(DataModel, $scope, $filter, display, requestNotificationChannel) {
    var vm = this;
    vm.markers = [];
    vm.map = {
      center: {
        latitude: 35.1,
        longitude: 33.3
      },
      zoom: 8
    };

    var id = 0;



    setMarkers();
    showMarkers();

    requestNotificationChannel.onSearchResultsReady($scope, function(){
      setMarkers();
      showMarkers();

    });

    requestNotificationChannel.onDisplayReady($scope, function(item){
      if(item === 'filter'){
        resetMarkers();
      }
    });

    function setMarkers(){
      var res = DataModel.getResults();

      vm.markers = [];

      for(var key in res){
        if(res[key].lat && res[key].lng && res[key].lat!== '0'){
          var add = true;
          for(var i in vm.markers){
            if( vm.markers[i].latitude === res[key].lat && vm.markers[i].longitude === res[key].lng ) {

              add = false;
            }
          }

          if(add){
            id++;
            vm.markers.push(
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

    }

    function resetMarkers() {
      _.each(vm.markers, function(marker){
        marker.clicked = false;
        marker.icon = null;
      });
    }

    function showMarkers() {
      _.each(vm.markers, function(marker){
        marker.onClicked = function(){
          if(marker.clicked){
            marker.icon=null;
            marker.clicked = false;
            display.resetDisplay();

          }else{
            _.each(vm.markers, function(thatMarker){
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


  }









})();



