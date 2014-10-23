/**
 * Created by urosdamnjanovic on 10/17/14.
 */

angular.module('mySearchModule')
  .controller('searchHistoryController', [ '$scope','requestNotificationChannel', 'searchHistoryService', function($scope, requestNotificationChannel,  searchHistoryService){
    $scope.history = [];
    var historyActive = false;

    requestNotificationChannel.onSearchResultsReady($scope, function(){
      if(!historyActive) {
        $scope.setActiveElement();
        $scope.history = searchHistoryService.setHistory(historyActive);
      }
      historyActive = false;
    });

    $scope.setActiveElement = function(i){
      _.each($scope.history, function(item){
        item.active = false;
      });

      if(i || i === 0){ $scope.history[i].active = true;}

    };

    $scope.historySelected = function(i){
      historyActive = true;
      $scope.setActiveElement(i);

      searchHistoryService.showResults(i);
    };


}]);

angular.module('mySearchModule')
  .service('searchHistoryService', ['DataModel','requestNotificationChannel' , 'display', function(DataModel,requestNotificationChannel, display){
    var history = [];

    this.getHistory = function(){
      return history;
    };

    this.showResults = function(i){
      requestNotificationChannel.historySet(history[i].query);
      DataModel.setResults(history[i].data);
      display.addDisplayData(history[i].data, 'search');
    };


    this.setHistory = function(){
      if(history.length === 8){
        history.splice(0,1);
      }
      history.push({ 'data' : DataModel.getResults(), 'active' : true, 'query' : DataModel.getQueryData()});
      return history;
    };


    return this;
  }]);

angular.module('mySearchModule')
  .directive('searchHistory', function(){
  return {
    restrict: 'E',
    controller: 'searchHistoryController',
    template: '<div ng-show="history.length" class="search-history">'+
              '<span class="label">Search history</span>'+
              '<div class="indicators-container">'+
              '<span ng-repeat="item in history" ng-click="historySelected($index)" ng-class="(item.active) ? \' indicator active\' : \' indicator\'"></span>'+
              '</div></div>'
  }
});

