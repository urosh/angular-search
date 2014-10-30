
(function(){
  'use strict';

  angular.module('app.controlls')
    .factory('ControlsService', ControlsService);

  ControlsService.$inject = ['$http'];


  function ControlsService($http){
    return {
      getTools : getTools
    };

    function getTools(){
      return $http.get('data/tools.json');
    }
  }


})();

