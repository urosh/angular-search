'use strict';

angular.module('mySearchModule', ['akoenig.deckgrid']);


angular.module('mySearchModule')
	.controller('paginationController', PaginationController);


angular.module('mySearchModule')
	.controller('searchController', SearchController);



angular.module('mySearchModule')
	.service('searchService', SearchService);

angular.module('mySearchModule')
	.directive('mySearch', SearchDirective);

angular.module('mySearchModule')
	.directive('myPagination', PaginationDirective);

