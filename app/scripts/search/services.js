'use strict';

function SearchService($http){
	
	this.initializeSearch = function(){
		return $http.get('http://public.cyi.ac.cy/starcRepo/map/init');
  };

  this.runSearch = function(data){
    return $http.get('http://public.cyi.ac.cy/starcRepo/map/search', {params: data});
  };
}