'use strict';

angular.module('common-services')
	.service('DataModel', function(CommonServices, $filter, $rootScope, display){
		

		this.selectedTools = [];
		this.queryData = {};
		
		this.searchResults = [];
		//this.displayItems = [];
		this.display = display;
		
		this.displayHistory = [];
		this.currentDisplay = [];

		// Tools selection. Adding and removing tools to the workspace
		this.selectTool = function(tools, e){
			CommonServices.addObjectFromCollection(tools, this.selectedTools, 'name', e);
		};

		this.removeTool = function(e){
			CommonServices.removeObjectFromCollection(this.selectedTools, 'name', e);
		};
		


		// Search 
		this.setQueryData = function(query){
			this.queryData = query;

		};

		this.setResults = function(res){
			this.searchResults = res;
			$rootScope.$broadcast('searchResultsSet');
    	
		};

    this.getResults = function(){
      return this.searchResults;
    };

		this.setDisplayItems = function(disp){
			this.displayHistory.push(disp);
			//this.displayItems  = disp;
      $rootScope.$broadcast('displayItemsSet');
    };

    this.removeCurrentDisplay = function(){
    	this.displayHistory.pop();
    };

    this.getDisplayItems = function(){
      //return this.displayItems;
      return this.displayHistory[this.displayHistory.length - 1];
    };




  });