'use strict';

function SearchDirective($animate){
	return {
		restrict: 'E',
		templateUrl: 'scripts/search/templates/search.tpl.html',
		scope:{},
		controller: function($scope, searchService, CommonServices, DataModel, requestNotificationChannel){
			$scope.selectedTypes = [];
			$scope.selectedCollections = [];
			$scope.types = [];
			$scope.collections = [];
			$scope.displayItems = [];

			$scope.initializeSearchData = function(){
				var _this = this;
				
				var searchInit = searchService.initializeSearch();
			  searchInit.then(function(res){
			  	$scope.collections = res.data.collections;
			    $scope.types = res.data.types;
			  });
			};

			$scope.collectionSelected = function(){
				CommonServices.addItemToArray($scope.selectedCollections, e);
			}

			$scope.typeSelected = function(e, i){
				CommonServices.addItemToArray($scope.selectedTypes, e);
			}

			$scope.search = function(){
				// search initialized
				
				var queryData = {
			    'search' : $scope.query.input,
			    'types' : $scope.selectedTypes,
			    'collections' : $scope.selectedCollections 
				};

				DataModel.setQueryData(queryData);
				
				// results.then(function(res){
				// 	//_this.preloaderActive = false;
				// });


				var results = searchService.runSearch();
				
				requestNotificationChannel.onSearchStarted($scope, function(){
					console.log('Search initialized');
				});
				requestNotificationChannel.searchStarted();
				

				requestNotificationChannel.onSearchResultsReady($scope, function(){
					console.log('results are ready');
				});

				requestNotificationChannel.onDisplayReady($scope, function(){
					console.log('display ready');
				})

				requestNotificationChannel.onQueryChange($scope, function(e){
					console.log(e)
				})
		
			};

			$scope.change = function(query){
				requestNotificationChannel.queryChange(query.input);
			};


			
		},

		link: function(scope){
			scope.advanced = false;
			scope.initializeSearchData();
		}
	}
};

function PaginationDirective(){
	return{
		restrict: 'E',
		templateUrl: 'scripts/search/templates/pagination.tpl.html',
		scope: {},
		controller: function(DataModel, $scope, display, requestNotificationChannel){
			$scope.numberOfItems = 0;
			$scope.items = [];
			requestNotificationChannel.onDisplayReady($scope, function(){
				
				initialize();
			})
			var initialize = function(){
				$scope.items = display.getDisplayWindow();
				$scope.numberOfItems = display.numberOfItems;
				$scope.currentPage = display.currentPage;
			};

			$scope.updateDisplay = function(currentPage, perPage){
				display.setDisplay(currentPage, perPage);
			}



		},
		link: function(scope){
			scope.perShow = false;
			scope.pagShow = false;
			scope.firstShow = false;
			scope.prevShow = false;
			scope.lastShow = false;
			scope.nextShow = false;
			
			scope.paginationNumbers = [];
			

			scope.currentPage = 1;
			scope.itemsPerPage = 20;

			
			var numberOfPages = 0;
			


			scope.perPage = function(e){
				scope.itemsPerPage = e;
				updatePaginationNumbers();
			};

			scope.itemPage = function(e){
				scope.currentPage = e;
				updatePaginationNumbers();
			};

			scope.firstPage = function(){
				
				scope.currentPage = 1;
				updatePaginationNumbers();
			};
			scope.prevPage = function(){
				if(scope.currentPage > 1){
					scope.currentPage--;
					updatePaginationNumbers();
				}
			};
			scope.nextPage = function(){
				if(scope.currentPage < numberOfPages ){
					scope.currentPage++;
					updatePaginationNumbers();
					
				}
			};

			scope.lastPage = function(){
				scope.currentPage = numberOfPages;
				updatePaginationNumbers();
			};


			scope.perPageNumbers = [20, 40, 80];

			


			function updatePaginationNumbers(){
				// last and next?
				if (scope.currentPage === 1){
					scope.firstShow = false;
				};

				
				scope.firstShow = false;
				scope.prevShow = false;
				scope.lastShow = false;
				scope.nextShow = false;

				numberOfPages = Math.ceil(scope.itemsnum/scope.itemsPerPage);
				scope.paginationNumbers = [];
				if( scope.itemsnum === 0 ){
					scope.perShow = false;
					scope.pagShow = false;

				}
				if( scope.itemsnum > scope.itemsPerPage ){

					scope.perShow = true;
					scope.pagShow = true;

					for (var i = -2; i < 3; i++){
						if( (scope.currentPage + i) > 0 && (scope.currentPage + i) < numberOfPages+1){
				
							scope.paginationNumbers.push(	scope.currentPage + i);
							if (i == -1){
								scope.firstShow = true;
								scope.prevShow = true;
							}
						}
					}

					
					if(scope.currentPage + 3 < numberOfPages){
						scope.lastShow = true;
						scope.nextShow = true;
					}
	
				}
				scope.updateDisplay(scope.currentPage, scope.itemsPerPage);
				
			}
			scope.$watchCollection('items', function() {
				if (scope.items){
					updatePaginationNumbers();
				}
							
			});
			//scope.perShow = true;
			//scope.pagShow = true;

		}
	}
}
