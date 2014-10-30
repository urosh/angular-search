(function(){
  'use strict';

  angular.module('app.commons')
    .directive('starcModal', function(){
      return{
        restrict: 'A',
        template: "<div ng-class=\"(vm.loading) ? '' : 'ng-hide'\"><div  ng-class=\"(vm.active) ? 'md-modal md-show' : 'md-modal'\" ng-include='vm.modal' ng-cloak></div><div class='md-overlay' ng-click='vm.removeModal()'></div></div>",
        controller: ModalController,
        controllerAs: 'vm'

      };
    });
  ModalController.$inject = ['$scope', 'CommonServices', 'requestNotificationChannel'];

  function ModalController($scope, CommonServices, requestNotificationChannel){
    var vm = this;

    vm.active = false;
    vm.imageLocation = '';
    vm.loading = false;
    vm.modal = '';
    vm.metadata = [];
    vm.title = '';
    vm.removeModal = removeModal;


    function removeModal() {
      vm.active = false;
      vm.title = '';
      vm.imageLocation = '#';
      vm.metadata = [];
    }



    function showDetails(docID) {
      vm.modal = 'scripts/common/templates/modal.tpl.html';

      var result = CommonServices.getItem(docID);
      result.then(function(res){
        vm.metadata = [];
        vm.title = res.data.title;
        vm.imageLocation = res.data.imageLocation;

        for (var i in res.data.metadataList ){
          for( var property in res.data.metadataList[i]){
            vm.metadata.push([property, res.data.metadataList[i][property]]);
          }
        }
        vm.loading = true;
        vm.active = true;

      });
    }
    requestNotificationChannel.onItemSelected($scope, showDetails);

  }

 })();

