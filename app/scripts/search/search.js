'use strict';

var searchModule = angular.module('mySearchModule', ['akoenig.deckgrid']);


searchModule.controller('searchController', SearchController);
searchModule.controller('paginationController', PaginationController);


searchModule.service('searchService', SearchService);



searchModule.directive('mySearch', SearchDirective);



searchModule.directive('myPagination', PaginationDirective);

