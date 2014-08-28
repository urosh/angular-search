'use strict';

angular.module('common-services')
	.factory('display', function($rootScope){
		var Display = {};
		Display.itemsPerPage = 20;
		Display.currentPage = 1;
		Display.numberOfItems = 0;
		Display.history = [];
		Display.sources = [];
		Display.window = [];

		Display.setDisplay = function(currentPage, perPage){
			if (currentPage){
				Display.currentPage = currentPage;
			}
			if(perPage){
				Display.itemsPerPage = perPage;
			}
			Display.window = Display.filterItems(Display.currentPage, Display.itemsPerPage);
			$rootScope.$broadcast('displayReady');

		};

		Display.filterItems = function(curPage, perPage){
			Display.window = [];
			var source = Display.sources[Display.sources.length-1];
			var result = [];
			var firstItem = ( curPage - 1 ) * perPage;
			var lastItem = (source.length > firstItem + perPage ? firstItem + perPage : source.length - 1);
			for(var i = firstItem; i < lastItem; i++){
				result.push(source[i]);
			}
			return result;
		};


		Display.addDisplayData = function(items, source){
			if(source === 'search'){
				Display.history = ['search'];
				Display.sources = [items];
			}else{
				if(source === Display.history[Display.history.length-1]){
					Display.sources[Display.sources.length-1] = items;
				}else{
					Display.source.push(items);
					Display.history.push(source);
				}
			}
			Display.numberOfItems = items.length;
			Display.setDisplay();
		};

		Display.removeDisplay = function(){

		};

		Display.getDisplayWindow = function(){
			return Display.window;
		}
		

		return Display; 

	})