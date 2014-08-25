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
			this.setMarkers(this.searchResults);
			$rootScope.$broadcast('data:ready');
			//that.displayItems = [that.displayItems[0], that.displayItems[1]];
			
		};

		this.setDisplayItems = function(disp){
			this.displayItems  = disp;
			$rootScope.$broadcast('update:display:list');
			
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
                latitude: res[key].lat, 
                longitude: res[key].lng,
                clicked: false,
                
              }
            );  
          }
          
        }
      }

     //   _.each(that.resultMarkers, function(marker){
     //     marker.onClicked = function(){
     //     	that.displayItems = [that.displayItems[0], that.displayItems[1]];
         	
     //    	console.log('marker clicked');
     //      if(marker.clicked){
     //        marker.icon=null;
     //        //that.displayItems = that.searchResults;
             
     //        marker.clicked = false;
     //      }else{
     //        _.each(that.resultMarkers, function(thatMarker){
     //          if( thatMarker!=marker && thatMarker.icon ){
     //            thatMarker.icon = null;
     //          }
     //        })
     //        marker.icon = 'images/green.png';
     //        that.displayItems = $filter('filter')(that.searchResults, function(item){
              
     //          if(item.lat == marker.latitude && item.lng == marker.longitude){
                
     //            return true;
     //          }else{
     //            false;
     //          }
     //        });
     //        marker.clicked = true;
     //        //that.setDisplayItems(that.displayItems);

     //      }
          
          
     //    }
    	// });
		};



	})