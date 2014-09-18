'use strict';

angular.module('myCollectionsModule', []);

angular.module('myCollectionsModule')
	.directive('myCollections', CollectionsDirective);

angular.module('myCollectionsModule')
	.service('collectionsService', CollectionsService);