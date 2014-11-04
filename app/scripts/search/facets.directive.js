(function(){

  'use strict';

  angular.module('app.search')
    .directive('starcFacets', FacetDirective);

  function FacetDirective() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'scripts/search/templates/facets.tpl.html',
      controller: FacetController,
      controllerAs: 'vm'
    };

    function FacetController($scope, requestNotificationChannel, DataModel, display) {
      var vm = this;

      vm.active = false;
      vm.types = [];
      vm.collections = [];
      vm.selectedTypes = [];
      vm.selectedCollections = [];
      vm.filterFacet = filterFacet;

      activate();

      function activate() {
        requestNotificationChannel.onSearchResultsReady($scope, resultsReady);
      }

      function resultsReady() {
        vm.active = true;
        vm.types = [];
        vm.collections = [];

        _.each(DataModel.getResultTypes(), function (item) {
          vm.types.push({'name': item, 'selected': false});
        });

        _.each(DataModel.getResultCollections(), function (item) {
          vm.collections.push({'name': item, 'selected': false});
        });

        vm.selectedTypes = [];
        vm.selectedCollections = [];
      }


      function updateDisplay() {

        var newDisplayData = [];

        if (!vm.selectedTypes.length && !vm.selectedCollections.length) {
          display.resetDisplay();
        } else {
          _.each(display.getDisplayData(), function (item) {
            var add = false;

            _.each(vm.selectedCollections, function (collection) {
              if (item.collection === collection.name) {
                add = true;
              }
            });

            _.each(vm.selectedTypes, function (type) {
              if (item.type === type.name) {
                add = true;
              }
            });

            if (add) {
              newDisplayData.push(item);
            }

          });
          display.addDisplayData(newDisplayData, 'facets');
        }
      }

      function filterFacet(type, index) {
        var collectionName = '';

        if(type === 'collections'){
          collectionName = 'selectedCollections'
        }else{
          collectionName = 'selectedTypes';
        }
        var currentStatus = vm[type][index].selected;
        vm[type][index].selected = !vm[type][index].selected;
        var add = true;
        var removeIndex = -1;
        _.each(vm[collectionName], function(item, i){
          if(item['name'] === vm[type][index]['name']){
            add = false;
            if(currentStatus){
              removeIndex = i;
            }
          }
        });
        if(currentStatus && removeIndex > -1){
          vm[collectionName].splice(removeIndex, removeIndex+1);
        }

        if(add){
          vm[collectionName].push(vm[type][index]);
        }

        updateDisplay();
      }

    }

    FacetController.$inject = ['$scope', 'requestNotificationChannel', 'DataModel', 'display'];

    return directive;

  }
})();




