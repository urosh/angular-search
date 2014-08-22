'use strict';

function ControllsServiceFunction($http){
	this.getTools = function(){
		return $http.get('data/tools.json');
	};
}


