'use strict';

function SearchService($http, DataModel){
	
	this.initializeSearch = function(){
		return $http.get('http://public.cyi.ac.cy/starcRepo/map/init');
  };

  this.runSearch = function(data){
    return $http.get('http://public.cyi.ac.cy/starcRepo/map/search', {params: data}).then(function(res){
    	DataModel.setResults(res.data);
    	DataModel.setDisplayItems(res.data);
    });
  };
}