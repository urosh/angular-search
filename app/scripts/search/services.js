'use strict';

function SearchService($http, DataModel, display){
	
	this.initializeSearch = function(){
		return $http.get('http://public.cyi.ac.cy/starcRepo/map/init');
  };

  this.runSearch = function(data){
    return $http.get('http://public.cyi.ac.cy/starcRepo/map/search', {params: DataModel.queryData}).then(function(res){
    	DataModel.setResults(res.data);
      display.addDisplayData(res.data, 'search');
      
    	//DataModel.setDisplayItems(res.data);
    });
  };
}