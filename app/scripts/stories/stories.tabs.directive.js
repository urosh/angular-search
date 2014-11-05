/**
 * Created by urosdamnjanovic on 11/5/14.
 */
(function(){
  'use strict'

  angular.module('app.stories')
    .directive('starcTabs', TabsDirective);

  function TabsDirective() {
    var directive = {
      restrict : 'E',
      scope : {},
      controller : TabsController,
      controllerAs : 'vm',
      template : '<div class="tab-container"><div ng-click="vm.setView(\'create\')" ng-class="vm.create ? \'tab active\' : \'tab\'">Create</div><div ng-click="vm.setView(\'preview\')" ng-class="!vm.create ? \'tab active\' : \'tab\'">Preview</div><div class="tab-footer"></div></div>',
    };
    function TabsController() {
      var vm = this;
      vm.create = true;
      vm.setView = setView;

      function setView(source) {
        if (source === 'create') { vm.create = true; } else{
          vm.create = false;
        }
      }
    }
    return directive;
  }
})();