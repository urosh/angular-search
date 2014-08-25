'use strict';

var searchModule = angular.module('mySearchModule', ['akoenig.deckgrid']);


searchModule.controller('searchController', SearchController);

searchModule.service('searchService', SearchService);



searchModule.directive('mySearch', SearchDirective);


