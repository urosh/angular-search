(function(){
 'use strict';
  angular.module('app.annotations')
    .directive('starcAnnotation', AnnotationsDirective);


  function AnnotationsDirective(){

    var directive = {
      restrict: 'E',
      scope: {},
      controller: AnnotationsController,
      controllerAs: 'vm',
      templateUrl: 'scripts/annotations/templates/annotations.tpl.html'

    };

    return directive;

    AnnotationsController.$inject = ['$scope', 'requestNotificationChannel', 'CommonServices', 'annotationsService', '$timeout'];

    function AnnotationsController ($scope, requestNotificationChannel, CommonServices, annotationsService, $timeout) {
      var vm = this;

      vm.annotation = {};
      vm.annotateMode = true;
      vm.annotation.title = '';
      vm.annotation.text = '';
      vm.annotationsList = [];
      vm.dialogActive = false;
      vm.dialogType = 'none';
      vm.dialogText="";
      vm.imageSource = '';
      vm.imageh = '';
      vm.objectLoaded = false;
      vm.saveAnnotation = saveAnnotation;

      var annotationData = {
        top: '',
        left: '',
        w: '',
        h: '',
        title: '',
        description: '',
        docID: ''
      };

      requestNotificationChannel.onItemAnnotate($scope, function(id){
        getAnnotations(id);

      });

      function saveAnnotation() {
        if(!vm.annotation.title){
          setDialog('Please add annotation title and try again.', 'notification');
        }else{
          annotationData.title = vm.annotation.title;
          if(vm.annotation.text){
            annotationData.description = vm.annotation.text;
          }
          annotationsService.saveAnnotation(annotationData).then(function(res){
            if(res.data.result === 'success'){
              setDialog('Annotation saved.', 'notification');
              vm.annotation.title = '';
              vm.annotation.text = '';
            }else{
              setDialog('There was problem while saving the annotation. Please try again.', 'notification');
            }

          });
        }

      }

      this.setArea = function(top, left, w, h){
        annotationData.top = top;
        annotationData.left = left;
        annotationData.w = w;
        annotationData.h = h;

      };

      function getAnnotations(id) {
        return CommonServices.getItem(id).then(function(res){

          vm.imageSource = res.data.imageLocation;
          vm.imageh = parseInt ( 350  * parseInt(res.data.imageHeight) / parseInt(res.data.imageWidth) );
          vm.objectLoaded = true;
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
            };
          });

          vm.annotationsList = list;
          return vm.annotationsList;

        });
      }

      function closeDialog() {
        vm.dialogActive = false;
        vm.dialogType = 'none';
        vm.dialogText="";
      }

      function setDialog(text, type) {
        vm.dialogText = text;
        vm.dialogType = type;
        vm.dialogActive = true;
        if (vm.dialogType === 'notification') {
          $timeout(function () {
            closeDialog();
          }, 5000);
        }

      }
    }
  }

})();




