/**
 * Created by urosdamnjanovic on 10/7/14.
 */
AnnotationsController = function($scope, requestNotificationChannel, CommonServices, annotationsService, $timeout){
  var annotationData = {
    top: '',
    left: '',
    w: '',
    h: '',
    title: '',
    description: '',
    docID: ''
  };

  $scope.annotation = {};

  $scope.annotateMode = true;


  requestNotificationChannel.onItemAnnotate($scope, function(id){
    var object = CommonServices.getItem(id).then(function(res){
      $scope.imageSource = res.data.imageLocation;
      $scope.imageh = parseInt ( 350  * parseInt(res.data.imageHeight) / parseInt(res.data.imageWidth) );
      $scope.objectLoaded = true;
      annotationData.docID = id;
      var list = res.data.annotations;
      _.each(list, function(item){
        item.width = parseInt(item.coordinates.width);
        item.height = parseInt(item.coordinates.height);
        item.top = parseInt(item.coordinates.top);
        item.left = parseInt(item.coordinates.left);
        item.center = {
          top: item.top + item.height / 2 - 4,
          left: item.left + item.width / 2 -4
        }
      });

      $scope.annotationsList = list;
    });
  });




  this.setArea = function(top, left, w, h){
    annotationData.top = top;
    annotationData.left = left;
    annotationData.w = w;
    annotationData.h = h;

  };



  var closeDialog = function(){
    $scope.dialogActive = false;
    $scope.dialogType = 'none';
    $scope.dialogText="";
  };

  var setDialog = function(text, type){
    $scope.dialogText = text;
    $scope.dialogType = type;
    $scope.dialogActive = true;
    if ($scope.dialogType === 'notification') {
      $timeout(function () {
        closeDialog();
      }, 5000);
    }

  };

  $scope.saveAnnotation = function() {
    if(!$scope.annotation.title){
      setDialog('Please add annotation title and try again.', 'notification');
    }else{
      annotationData.title = $scope.annotation.title;
      if($scope.annotation.text){
        annotationData.description = $scope.annotation.text;
      }
      annotationsService.saveAnnotation(annotationData).then(function(res){
        if(res.data === 'success'){
          setDialog('Annotation saved.', 'notification');
          $scope.annotation.title = '';
          $scope.annotation.text = '';
        }else{
          setDialog('There was problem while saving the annotation. Please try again.', 'notification');
        }

      });
    }


  };

}

AnnotationsController.$inject = ['$scope', 'requestNotificationChannel', 'CommonServices', 'annotationsService', '$timeout'];