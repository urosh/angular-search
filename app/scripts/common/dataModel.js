'use strict';

angular.module('common-services')
	.service('DataModel', function(CommonServices, $filter, $rootScope){
		

		this.selectedTools = [];
		this.queryData = {};
		this.searchResults = [];
		this.displayItems = [];
		this.resultMarkers = [];
    this.name = '';
    


		var that = this;
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
			this.resultMarkers = [];
      $rootScope.$broadcast('searchResultsSet');
      
			//that.displayItems = [that.displayItems[0], that.displayItems[1]];
			
		};

    this.getResults = function(){
      return this.searchResults;
    };

		this.setDisplayItems = function(disp){
			this.displayItems  = disp;
      $rootScope.$broadcast('displayItemsSet');
      this.name = this.displayItems[0].label;
    	
		};

    this.getDisplayItems = function(){
      return this.displayItems;
    }





  });