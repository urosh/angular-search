function SearchDirective($animate){
	return {
		restrict: 'E',
		templateUrl: 'scripts/search/templates/search.tpl.html',
		scope:{},
		controller: SearchController,

		link: function(scope){
			scope.advanced = false;
			scope.initializeSearchData();
		}
	}
};