'use strict';

angular.module('common-services')
	.service('DataModel', function(CommonServices){
		

		this.selectedTools = [];
		this.queryData = {};
		this.searchResults = [];
		this.displayItems = [];
		this.resultMarkers = [];


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
			this.setMarkers(res);
		};

		this.setDisplayItems = function(disp){
			this.displayItems = disp;
		}

		// Map 
		this.setMarkers = function(res){
			for(var key in res){
        if(res[key].lat && res[key].lng && res[key].lat!='0'){
          var add = true;
          for(var i in that.resultMarkers){
            if( that.resultMarkers[i]['latitude'] === res[key].lat && that.resultMarkers[i]['longitude'] === res[key].lng ) {
              add = false;
            }
          }
          if(add){
            that.resultMarkers.push(
              {
                id: key, 
                latitude: res.data[key].lat, 
                longitude: res.data[key].lng,
                clicked: false,
                
              }
            );  
          }
          
        }
      }
		};








		this.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
    };



		//this.model.selectedTools = selectedTools;


	})