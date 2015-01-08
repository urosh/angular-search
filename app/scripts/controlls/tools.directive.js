(function(){
  'use strict';

  angular.module('app.controlls')
    .directive('starcSelectedTools', ToolsDirective);

  function ToolsDirective() {
    var directive = {
      restrict : 'E',
      scope : {},
      transclude : true,
      templateUrl : 'scripts/controlls/templates/toolsSelect.tpl.html',
      controller : ToolsController,
      controllerAs : 'vm'

    };

    ToolsController.$inject = ['DataModel'];

    function ToolsController(DataModel){
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

    return directive;

  }



}) ();







