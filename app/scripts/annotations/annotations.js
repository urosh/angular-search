
angular.module('annotationsModule', []);

var CropDirective, AnnotationsService, AnnotationsDirective, AnnotationsController, ListannotationDirective;

angular.module('annotationsModule')
	.directive('myCrop', CropDirective);

angular.module('annotationsModule')
  .service('annotationsService', AnnotationsService);

angular.module('annotationsModule')
  .controller('annotationsController', AnnotationsController);

angular.module('annotationsModule')
	.directive('myAnnotation', AnnotationsDirective);

angular.module('annotationsModule')
	.directive('myListAnnotations', ListannotationDirective);

