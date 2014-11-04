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


    activate();

    function activate() {
      vm.markers = mapService.setMarkers();
      mapService.showMarkers(vm.markers);

      requestNotificationChannel.onSearchResultsReady($scope, function(){
        vm.markers = mapService.setMarkers();
        mapService.showMarkers(vm.markers);

      });

      requestNotificationChannel.onDisplayReady($scope, function(item){
        if(item === 'filter'){
          mapService.resetMarkers(vm.markers);
        }
      });

    }
  }


})();



