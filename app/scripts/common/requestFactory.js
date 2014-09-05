angular.module('commons')
	.factory('requestNotificationChannel',['$rootScope', function($rootScope){
		
		var _RESULTS_READY_ = '_RESULTS_READY_';
    var _DISPLAY_TAKEN_ = '_DISPLAY_TAKEN_';
    var _ITEM_CLICKED_ = '_ITEM_CLICKED_';
    
		var searchResultsReady = function(){

		};
		var onSearchResultsReady = function(){

		};

		var displayReady = function(){

		};

		var onDisplayReady = function(){

		}

		return {
			searchResultsReady: searchResultsReady,
			onSearchResultsReady: onSearchResultsReady,
			displayReady: displayReady,
			onDisplayReady: onDisplayReady
		}
	}]);