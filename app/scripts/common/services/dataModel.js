'use strict';

function DataModel(CommonServices, $filter, $rootScope, display, requestNotificationChannel){
	this.selectedTools = [];
		this.queryData = {};
		this.selectedTools = [];

		this.searchResults = [];
		//this.displayItems = [];
		this.display = display;
		
		
		// Tools selection. Adding and removing tools to the workspace
		this.selectTool = function(tools, e){
			CommonServices.addObjectFromCollection(tools, this.selectedTools, 'name', e);
		};

		this.removeTool = function(e){
			CommonServices.removeObjectFromCollection(this.selectedTools, 'name', e);
		};

		this.getSelectedTools = function(){
			return this.selectedTools;
		}
		


		// Search 
		this.setQueryData = function(query){
			this.queryData = query;

		};

		this.setResults = function(res){
			this.searchResults = res;
			requestNotificationChannel.searchResultsReady();

			//$rootScope.$broadcast('searchResultsSet');
    	
		};

    this.getResults = function(){
      return this.searchResults;
    };

}

DataModel.$inject = ['CommonServices', '$filter', '$rootScope', 'display', 'requestNotificationChannel'];