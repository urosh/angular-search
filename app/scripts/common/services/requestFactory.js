'use strict';

function RequestFactory($rootScope){
	var _SEARCH_START_ = '_SEARCH_START_';
		var _RESULTS_READY_ = '_RESULTS_READY_';
    var _DISPLAY_READY_ = '_DISPLAY_READY_';
    var _ITEM_CLICKED_ = '_ITEM_CLICKED_';
    var _QUERY_CHANGE_ = '_QUERY_CHANGE_';
    
    var searchStarted = function(){
    	$rootScope.$broadcast(_SEARCH_START_);
    };

    var onSearchStarted = function($scope, handler){
    	$scope.$on(_SEARCH_START_, function(event){
    		handler();
    	})
    };

		var searchResultsReady = function(){
			$rootScope.$broadcast(_RESULTS_READY_);
		};

		var onSearchResultsReady = function($scope, handler){
			$scope.$on(_RESULTS_READY_, function(event){
				handler();
			})
		};

		var displayReady = function(){
			$rootScope.$broadcast(_DISPLAY_READY_)
		};

		var onDisplayReady = function($scope, handler){
			$scope.$on(_DISPLAY_READY_, function(event){
				handler();
			})
		}

		var queryChange = function(query){
			$rootScope.$broadcast(_QUERY_CHANGE_, {query: query})
		};

		var onQueryChange = function($scope, handler){
			$scope.$on(_QUERY_CHANGE_, function(event, args){
				handler(args.query);
			})
		}

		return {
			searchStarted: searchStarted,
			onSearchStarted: onSearchStarted,
			searchResultsReady: searchResultsReady,
			onSearchResultsReady: onSearchResultsReady,
			displayReady: displayReady,
			onDisplayReady: onDisplayReady,
			queryChange: queryChange, 
			onQueryChange: onQueryChange
		}
};

RequestFactory.$inject = ['$rootScope'];