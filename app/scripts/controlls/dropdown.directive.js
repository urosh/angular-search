(function(){
  'use strict';

  angular.module('app.controlls')
    .directive('starcDropdown', DropDownDirective);

  function DropDownDirective(){
    var directive = {
      restrict: 'E',
      scope: {},
      controller: DropDownController,
      controllerAs: 'vm',
      require: '^starcSelectedTools',
      template: '<div class="wrapper-demo">' +
        '<div id="dd" ng-class="(active) ? \'wrapper-dropdown active\' : \'wrapper-dropdown\'"  ng-click="active=!active" tabindex="1">' +
        'Select tools' +
        '<ul  class="dropdown">' +
        '<li ng-repeat="tool in vm.tools"><a href="#" ng-click="select(tool.name)">{{ tool.name }}</a></li>' +
        '</ul></div></div>',
      link: function(scope, element, attrs, starcSelectedToolsCtrl) {
        scope.select = function (tool) {
          starcSelectedToolsCtrl.itemSelected(scope.tools, tool);
        };
      }
    };




    DropDownController.$inject = ['ControlsService', 'DataModel'];

    function DropDownController(ControlsService,  DataModel) {
      var vm = this;

      vm.tools = [];
      var promise = ControlsService.getTools();

      promise.then(function(res){
        vm.tools = res.data;
        DataModel.setTools(res.data);
        DataModel.selectTool(res.data, 'map');
      });

    }


    return directive;

  }



})();






