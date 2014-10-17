'use strict';

function SearchService($http, DataModel, display){
	
	this.initializeSearch = function(){
		return $http.get('http://public.cyi.ac.cy/starcRepo/map/init');
  };

  this.runSearch = function(){
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
  };

  this.listItems = function(items){

    var data  = JSON.stringify({
      'items' : items
    });

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return $http.post('http://public.cyi.ac.cy/starcRepo/map/list', data).then(function(res){
      DataModel.setResults(res.data);
      display.addDisplayData(res.data, 'search');
    });


  }

  this.getStats = function(){
    return $http.get('http://public.cyi.ac.cy/starcRepo/map/stats');
  };

  this.getStatTime = function(){
    return $http.get('http://public.cyi.ac.cy/starcRepo/map/time');
  };
}