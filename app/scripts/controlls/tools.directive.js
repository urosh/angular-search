(function(){
  'use strict';

  angular.module('app.controlls')
    .directive('starcSelectedTools', function() {
      return {
        restrict : 'E',
        scope : {},
        transclude : true,
        templateUrl : 'scripts/controlls/templates/tools-select.tpl.html',
        controller : ToolsController,
        controllerAs : 'vm'
      };
    });

  ToolsController.$inject = ['$scope', 'DataModel'];

  function ToolsController($scope, DataModel){
    var vm = this;

    vm.tools = DataModel.getSelectedTools();

    vm.remove = function(tool){
      DataModel.removeTool(tool);
      vm.tools = DataModel.getSelectedTools();
    };

    this.itemSelected = function(tools, tool){
      DataModel.selectTool(tools, tool);
      vm.tools = DataModel.getSelectedTools();
    };

  }

}) ();







