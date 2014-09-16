'use strict';

function RequestFactory($rootScope){
	var _SEARCH_START_ = '_SEARCH_START_';
	var _RESULTS_READY_ = '_RESULTS_READY_';
  var _DISPLAY_READY_ = '_DISPLAY_READY_';
  var _ITEM_CLICKED_ = '_ITEM_CLICKED_';
  var _QUERY_CHANGE_ = '_QUERY_CHANGE_';
  var _TOOL_ADDED_ = '_TOOL_ADDED_';
  var _TOOL_REMOVED_ = '_TOOL_REMOVED_';
  var _ITEM_ADDED_TO_COLLECTION = '_ITEM_ADDED_TO_COLLECTION';
  
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

	var displayReady = function(item){
		$rootScope.$broadcast(_DISPLAY_READY_, {display: item});
	};

	var onDisplayReady = function($scope, handler){
		$scope.$on(_DISPLAY_READY_, function(event, args){
			handler(args.display);
		})
	}

	var queryChange = function(query){
		$rootScope.$broadcast(_QUERY_CHANGE_, {query: query})
	};

	var onQueryChange = function($scope, handler){
		$scope.$on(_QUERY_CHANGE_, function(event, args){
			handler(args.query);
		})
	};

	var itemSelect = function(docID){
		$rootScope.$broadcast(_ITEM_CLICKED_, {docID: docID});
	};

	var onItemSelected = function($scope, handler){
		$scope.$on(_ITEM_CLICKED_, function(event, args){
			handler(args.docID);
		})
	};

	var toolAdded = function(tool){
		$rootScope.$broadcast(_TOOL_ADDED_, {tool: tool});
	};

	var onToolAdded = function($scope, handler){
		$scope.$on(_TOOL_ADDED_, function(event, args){
			handler(args.tool);
		})
	};

	var toolRemoved = function(tool){
		$rootScope.$broadcast(_TOOL_REMOVED_, {tool: tool});
	};

	var onToolRemoved = function($scope, handler){
		$scope.$on(_TOOL_REMOVED_, function(event, args){
			handler(args.tool);
		})
	};

	var itemAddedToCollection = function(item){
		$rootScope.$broadcast(_ITEM_ADDED_TO_COLLECTION, {id: item});
	};

	var onItemAddedToCollection = function($scope, handler){
		$scope.$on(_ITEM_ADDED_TO_COLLECTION, function(event, args){
			handler(args.id);
		})
	};

	






	return {
		searchStarted: searchStarted,
		onSearchStarted: onSearchStarted,
		searchResultsReady: searchResultsReady,
		onSearchResultsReady: onSearchResultsReady,
		displayReady: displayReady,
		onDisplayReady: onDisplayReady,
		queryChange: queryChange, 
		onQueryChange: onQueryChange,
		itemSelect: itemSelect, 
		onItemSelected: onItemSelected,
		toolAdded: toolAdded,
		onToolAdded: onToolAdded,
		toolRemoved: toolRemoved,
		onToolRemoved: onToolRemoved,
		itemAddedToCollection: itemAddedToCollection,
		onItemAddedToCollection: onItemAddedToCollection
	}
};

RequestFactory.$inject = ['$rootScope'];