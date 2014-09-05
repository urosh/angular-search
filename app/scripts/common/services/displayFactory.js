'use strict';
function DisplayFactory($rootScope, requestNotificationChannel){
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
			if(Display.sources.length){
				Display.window = Display.filterItems(Display.currentPage, Display.itemsPerPage);
				Display.numberOfItems = Display.sources[Display.sources.length-1].length;
				//$rootScope.$broadcast('displayTaken', Display.history[Display.history.length-1]);	
				requestNotificationChannel.displayReady();			
			}


		};

		Display.filterItems = function(curPage, perPage){
			Display.window = null;
			var source = Display.sources[Display.sources.length-1];
			var result = [];
			var firstItem = ( curPage - 1 ) * perPage;
			var lastItem = (source.length > firstItem + perPage ? firstItem + perPage : source.length);
			for(var i = firstItem; i < lastItem; i++){
				result.push(source[i]);
			}
			return result;
		};


		Display.addDisplayData = function(items, source){
			if(source === 'search'){
				Display.history = ['search'];
				Display.itemsPerPage = 20;
				Display.currentPage = 1;
				Display.sources=[items];
			}else{
				
				Display.history[1] = source;
				Display.sources[1] = items;
			}
			Display.displaySourceChange(source);
			Display.setDisplay();
		};

		Display.resetDisplay = function(){
			Display.sources.pop();
			Display.history.pop();
			Display.setDisplay();
			
		};

		Display.getDisplayData = function(){
			return Display.sources[0];
			
		}

		Display.getDisplayWindow = function(){
			return Display.window;
		}
		
		Display.displaySourceChange = function(){
			
		}
		return Display; 
}