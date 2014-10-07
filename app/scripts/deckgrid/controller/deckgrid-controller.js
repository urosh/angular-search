'use strict';

function DeckgridController($scope, $filter, requestNotificationChannel, DataModel, display){
	$scope.itemAddedToCollection = function(item){
    requestNotificationChannel.itemAddedToCollection(item);
  };

  $scope.annotateItem = function(item){
    requestNotificationChannel.itemAnnotate(item);
  };
  
  $scope.itemClicked = function(e){
    requestNotificationChannel.itemSelect(e);
  };


  $scope.active = false;
  requestNotificationChannel.onDisplayReady($scope, function(){
     $scope.model = display.getDisplayWindow();
     $scope.active = false;
  });

  $scope.tools = [];
  $scope.toolsShown = false;
  requestNotificationChannel.onToolAdded($scope, function(item){
    
    
    if(item === 'collections'){
      $scope.collectionsActive = true;
      $scope.toolsShown = true;
    }
    if(item === 'annotations'){
      $scope.annotationsActive = true;
      $scope.toolsShown = true;
    }


  });

  requestNotificationChannel.onToolRemoved($scope, function(item){
    
    if(item === 'collections'){
      $scope.collectionsActive = false;
      if(!$scope.annotationsActive){
        $scope.toolsShown = false;
      }
    }
    if(item === 'annotations'){
      $scope.annotationsActive = false;
      if(!$scope.collectionsActive){ $scope.shown = false; }
    }


  });


  requestNotificationChannel.onSearchStarted($scope, function(){
    $scope.model = [];
    $scope.active = true;
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

  	
}

DeckgridController.$inject = ['$scope', '$filter', 'requestNotificationChannel', 'DataModel', 'display'];
