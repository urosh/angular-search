'use strict';

angular.module('common-services')
	.service('DataModel', function(CommonServices, $filter, $rootScope){
		

		this.selectedTools = [];
		this.queryData = {};
		this.searchResults = [];
		this.displayItems = [];
		this.resultMarkers = [];

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
			//this.displayItems = res;
      //this.setMarkers(this.searchResults);
      this.resultMarkers = [];
      $rootScope.$broadcast('data:ready');
      
			//that.displayItems = [that.displayItems[0], that.displayItems[1]];
			
		};

		this.setDisplayItems = function(disp){
			this.displayItems  = disp;
      $rootScope.$broadcast('update:display:list');
			
		}





  });