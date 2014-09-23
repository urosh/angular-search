'use strict';

angular.module('mySearchModule', ['akoenig.deckgrid']);


angular.module('mySearchModule')
	.controller('paginationController', PaginationController);


angular.module('mySearchModule')
	.controller('searchController', SearchController);





angular.module('mySearchModule')
	.directive('mySearch', SearchDirective);

angular.module('mySearchModule')
	.directive('myPagination', PaginationDirective);

angular.module('mySearchModule')
	.directive('myFacets', FacetDirective);
