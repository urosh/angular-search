(function(){
  'use strict';

  angular.module('app.commons')
    .directive('starcPreloader', PreloaderDirective);

  function PreloaderDirective(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        active: '='
      },
      template: '<div ng-show="active" ><img  src="images/preloader4.gif"/></div>',

    };
  }
}) ();


