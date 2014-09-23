'use strict';

function DataModel(CommonServices, $filter, $rootScope, display, requestNotificationChannel){
	this.selectedTools = [];
		this.queryData = {};
		this.selectedTools = [];

		this.searchResults = [];
		this.resultCollections = [];
		this.resultTypes = [];

		//this.displayItems = [];
		this.display = display;
		var _this = this;
		
		// Tools selection. Adding and removing tools to the workspace
		this.selectTool = function(tools, e){
			CommonServices.addObjectFromCollection(tools, this.selectedTools, 'name', e);
			requestNotificationChannel.toolAdded(e);

		};

		this.removeTool = function(e){
			CommonServices.removeObjectFromCollection(this.selectedTools, 'name', e);
			requestNotificationChannel.toolRemoved(e);
		};

		this.getSelectedTools = function(){
			return this.selectedTools;
		}
		


		// Search 
		this.setQueryData = function(query){
			this.queryData = query;

		};

		this.getQueryData = function(){
			return this.queryData;
		};
		


		this.setResults = function(res){
			this.resultCollections = [];
			this.resultTypes = [];

			this.searchResults = res;
			_.each(_this.searchResults, function(item){
				var collectionExists = false;
				var typeExists = false;
				_.each(_this.resultCollections, function(coll){
					if(item.collection === coll){
						collectionExists = true;
					}
				})
				_.each(_this.resultTypes, function(type){
					if(type === item.type){
						typeExists = true;
					}
				})
				if(!collectionExists) { _this.resultCollections.push(item.collection); }
				if(!typeExists) { _this.resultTypes.push(item.type); }
					
			})
			
			requestNotificationChannel.searchResultsReady();

			//$rootScope.$broadcast('searchResultsSet');
    	
		};

    this.getResults = function(){
      return this.searchResults;
    };

    this.getResultTypes = function(){
    	return this.resultTypes;
    };

    this.getResultCollections = function(){
    	return this.resultCollections;
    }

    this.getItemById = function(id){
    	return CommonServices.getItemById(this.searchResults, id);
    };

    this.removeItemById = function(id){
    	CommonServices.removeItemById()
    }

}

DataModel.$inject = ['CommonServices', '$filter', '$rootScope', 'display', 'requestNotificationChannel'];