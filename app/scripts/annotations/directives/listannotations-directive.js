/**
 * Created by urosdamnjanovic on 10/7/14.
 */
ListannotationDirective = function(){
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, requestNotificationChannel, CommonServices){
      requestNotificationChannel.onItemAnnotate($scope, function(id){
        var object = CommonServices.getItem(id).then(function(res){
          console.log('ok we are here??');
          $scope.imageSource = res.data.imageLocation;
          $scope.docID = id;
          $scope.imageAdded = true;
          $scope.imageW = 350;
          $scope.imageH = parseInt ( 350  * parseInt(res.data.imageHeight) / parseInt(res.data.imageWidth) );

        });
      });
    },
    templateUrl: 'scripts/annotations/templates/list.tpl.html'
  }
}