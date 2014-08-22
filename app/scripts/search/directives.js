'use strict';

function SearchDirective($animate){
	return {
		restrict: 'A',
		templateUrl: 'scripts/search/search.tpl.html',
		scope:{
			collections: '=',
			types: '=',
			typeSelected: '&typein',
			collectionSelected: '&collectionin',
			search: '&search',
			query: '='
		},
		link: function(scope){
			scope.advanced = false;
			// get collections and other data that needs to be displayed.
			// or should i do it in controller

		}
	}
};
