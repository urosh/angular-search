/**
 * Created by urosdamnjanovic on 10/14/14.
 */

angular.module('visualizationModule')
  .controller('timeBarController', ['$scope', 'searchService', function($scope, searchService){
    var data = [];
    searchService.getStatTime().then(function(res){
      $scope.data = res.data;
    });

  }]);

angular.module('visualizationModule')
  .directive('timeBar', function () {
    return {
      restrict: 'E',
      scope: {},
      controller: 'timeBarController',
      template: '<div>Ajmo ajde</div>',
      link: function(scope, element, attrs){

      }
    }
  });

