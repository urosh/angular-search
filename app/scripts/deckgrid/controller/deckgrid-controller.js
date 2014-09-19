'use strict';

function DeckgridController($scope, $filter, requestNotificationChannel, DataModel, display){
	$scope.itemAddedToCollection = function(item){
    requestNotificationChannel.itemAddedToCollection(item);
  };
  $scope.active = false;
  requestNotificationChannel.onDisplayReady($scope, function(){
     $scope.model = display.getDisplayWindow();
     $scope.active = false;
  });

  $scope.toolsShown = false;
  
  requestNotificationChannel.onToolAdded($scope, function(item){
    if(item === 'collections'){
      $scope.toolsShown = true;
    }
  });
  requestNotificationChannel.onSearchStarted($scope, function(){
    $scope.active = true;
  });


  requestNotificationChannel.onToolRemoved($scope, function(item){
    if(item === 'collections'){
      $scope.toolsShown = false;
    }
  });

  requestNotificationChannel.onQueryChange($scope, function(query){
    if(query == ''){
      display.resetDisplay();
    }else{
      if(DataModel.searchResults.length){
        display.addDisplayData($filter('filter')(display.getDisplayData(), query), 'filter');
      }
    
    }
  });

  $scope.itemClicked = function(e){
    requestNotificationChannel.itemSelect(e);
  }	
}

DeckgridController.$inject = ['$scope', '$filter', 'requestNotificationChannel', 'DataModel', 'display'];
