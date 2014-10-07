/**
 * Created by urosdamnjanovic on 10/7/14.
 */

AnnotationsService = function($http){
  'use strict';

  this.saveAnnotation = function(_annotation_){
    JSON.stringify(_annotation_);

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return $http.post('http://public.cyi.ac.cy/starcRepo/map/saveannotation', _annotation_);


  };

};

AnnotationsService.$inject = ['$http'];

