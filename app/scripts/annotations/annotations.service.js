/**
 * Created by urosdamnjanovic on 10/7/14.
 */

(function(){
  'use strict';

  angular.module('app.annotations')
    .factory('annotationsService', AnnotationsService);

  function AnnotationsService($http) {

    var service = {
      saveAnnotation: saveAnnotation
    };

    return service;

    function saveAnnotation(annotation){
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      return $http.post('http://public.cyi.ac.cy/starcRepo/map/saveannotation', JSON.stringify(annotation));
    }

  }
  AnnotationsService.$inject = ['$http'];

})();

