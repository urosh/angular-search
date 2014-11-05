/**
 * Created by urosdamnjanovic on 11/5/14.
 */
(function(){

  'use strict';
  angular.module('app.stories')
    .directive('starcStories', StoriesDirective);

  function StoriesDirective() {
    var directive = {
      restrict : 'E',
      controller : StoriesController,
      controllerAs : 'vm',
      scope : {},
      template : '<div class="stories-container" ><h3>Create story</h3><starc-stories-block ng-repeat="block in vm.blocks" index="$index"  data="block.type"></starc-stories-block></div>'
    };

    function StoriesController() {
      var vm = this;
      vm.addBlock = addBlock;
      vm.removeBlock = removeBlock;

      vm.blocks = [
        {'type' : 'title'},
        {'type' : 'block'},
        {'type' : 'block'},
        {'type' : 'block'},
      ];

      function addBlock(i) {
        vm.blocks.splice(i+1, 0, {'type': 'block'});
      }

      function removeBlock(i) {
        vm.blocks.splice(i, 1);
      }
      return vm;
    }
    return directive;
  }
})();