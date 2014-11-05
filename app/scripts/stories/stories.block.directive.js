/**
 * Created by urosdamnjanovic on 11/5/14.
 */
(function(){

  'use strict';
  angular.module('app.stories')
    .directive('starcStoriesBlock', StoriesBlockDirective);

  function StoriesBlockDirective() {
    var directive = {
      restrict : 'E',
      controller : StoriesBlockController,
      controllerAs : 'vm',
      require: '^starcStories',
      scope : {
        data : '=',
        index : '='
      },
      templateUrl : 'scripts/stories/templates/story.block.template.html',
      link: linkFunc
    };

    function linkFunc(scope, element, attrs, starcStoriesCtrl) {
      scope.addBlock = addBlock;
      scope.removeBlock = removeBlock;

      function addBlock() {

        starcStoriesCtrl.addBlock(scope.index);
      }

      function removeBlock() {
        starcStoriesCtrl.removeBlock(scope.index);
      }
    }
    StoriesBlockController.$inject = ['$scope'];

    function StoriesBlockController($scope) {
      var vm = this;
      vm.blockSelected = blockSelected;
      vm.menuActive = false;
      vm.addSource = addSource;
      vm.objectActive = false;
      vm.textActive = false;
      vm.title =  ($scope.data === 'title');
      vm.blockTitle = '';
      if($scope.data === 'title') { vm.blockTitle = "Title block"; }

      function addSource(source) {
        vm.objectActive = false;
        vm.textActive = false;
        vm[source + 'Active'] = true;
        if(source === 'object') { vm.blockTitle = 'Object block'; }
        else { vm.blockTitle = 'Text block';}
        //vm.objectActive = true;
      }



      function blockSelected() {
        vm.menuActive = !vm.menuActive;

      }
    }
    return directive;
  }
})();/**
 * Created by urosdamnjanovic on 11/5/14.
 */
