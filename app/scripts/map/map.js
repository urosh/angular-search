(function(){
  'use strict';


  angular.module('app.map')
    .controller('mapController', MapController);

  MapController.$inject = ['DataModel', '$scope', '$filter', 'display', 'requestNotificationChannel', 'mapService'];

  function MapController(DataModel, $scope, $filter, display, requestNotificationChannel, mapService) {
    var vm = this;
    vm.markers = [];
    vm.map = {
      center: {
        latitude: 35.1,
        longitude: 33.3
      },
      zoom: 8
    };

    vm.onClicked = function(marker){
      console.log(marker.model);
      vm.markers = mapService.setMarkers(marker.model);
    }


    activate();

    function activate() {
      vm.markers = mapService.setMarkers();
      
      requestNotificationChannel.onSearchResultsReady($scope, function(){
        vm.markers = mapService.setMarkers();
      
      });

      requestNotificationChannel.onDisplayReady($scope, function(item){
        if(item === 'filter'){
          mapService.resetMarkers(vm.markers);
        }
      });

    }
  }


})();



