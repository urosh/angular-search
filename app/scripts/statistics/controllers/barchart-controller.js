/**
 * Created by urosdamnjanovic on 9/26/14.
 */



function BarchartController($scope, searchService){
  var data = [];

  searchService.getStatTime().then(function(res){
    $scope.data = res.data;
  });
}

BarchartController.$inject = ['$scope', 'searchService'];

