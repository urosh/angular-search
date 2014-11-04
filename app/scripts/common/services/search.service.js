(function(){

  'use strict';

  angular.module('app.commons')
    .factory('searchService', SearchService);


  function SearchService($http, DataModel, display){

    var service = {
      initializeSearch : initializeSearch,
      runSearch : runSearch,
      listItems : listItems,
      getStats : getStats,
      getStatTime : getStatTime
    };

    return service;

    function initializeSearch(){
      return $http.get('http://public.cyi.ac.cy/starcRepo/map/init');
    }

    function runSearch() {
      var params = DataModel.getQueryData();
      var data = {
        'search' : params.search,
        'collections[]': params.collections,
        'types[]': params.types
      };
      return $http.get('http://public.cyi.ac.cy/starcRepo/map/search', {params: data}).then(function(res){
        DataModel.setResults(res.data);
        display.addDisplayData(res.data, 'search');

      });
    }


    function listItems(items){

      var data  = JSON.stringify({
        'items' : items
      });

      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      return $http.post('http://public.cyi.ac.cy/starcRepo/map/list', data).then(function(res){
        DataModel.setResults(res.data);
        display.addDisplayData(res.data, 'search');
      });
    }

    function getStats() {
      return $http.get('http://public.cyi.ac.cy/starcRepo/map/stats');
    }

    function getStatTime() {
      return $http.get('http://public.cyi.ac.cy/starcRepo/map/time');
    }
  }

})();

