/**
 * Created by urosdamnjanovic on 10/7/14.
 */
AnnotationsController = function($scope){
  this.removeNotification = function(docID){
    $scope.objectLoaded = true;
  };
  $scope.annotateMode = true;
  var annotation = {
    top: '',
    left: '',
    w: '',
    h: '',
    title: '',
    description: ''
  };

  this.setArea = function(top, left, w, h, docID){
    annotation.top = top;
    annotation.left = left;
    annotation.w = w;
    annotation.h = h;
    annotation.docID = docID;
  };



  var closeDialog = function(){
    $scope.dialogActive = false;
    $scope.dialogType = 'none';
    $scope.dialogText="";
  };
  $scope.annotation = {};

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
    console.log(annotation);
    if(!$scope.annotation.title){
      setDialog('Please add annotation title and try again.', 'notification');
    }else{
      annotation.title = $scope.annotation.title;
      if($scope.annotation.text){
        annotation.description = $scope.annotation.text;
      }
      annotationsService.saveAnnotation(annotation).then(function(res){
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

AnnotationsController.$inject = ['$scope'];