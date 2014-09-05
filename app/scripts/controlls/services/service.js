'use strict';


function ControllsService($http){
	this.getTools = function(){
		return $http.get('data/tools.json');
	};
}

ControllsService.$inject = ['$http'];



