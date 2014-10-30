(function(){
 'use strict';
  angular.module('app.annotations')
    .directive('starcAnnotation', function(){
      return {
        restrict: 'E',
        scope: {},
        controller: 'AnnotationsController',
        controllerAs: 'vm',
        templateUrl: 'templates/annotations.tpl.html'

      };
    });
})();




