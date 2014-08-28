'use strict';

function SearchDirective($animate){
	return {
		restrict: 'A',
		templateUrl: 'scripts/search/templates/search.tpl.html',
		scope:{
			collections: '=',
			types: '=',
			typeSelected: '&typein',
			collectionSelected: '&collectionin',
			search: '&search',
			query: '=',
			change: '&change'

		},
		link: function(scope){
			scope.advanced = false;
			scope.changeMe = function(){
		
			}
		}
	}
};

function PaginationDirective(){
	return{
		restrict: 'A',
		templateUrl: 'scripts/search/templates/pagination.tpl.html',
		scope: {
			items: '=',
			// perPage: '&perpage',
			// itemPage: '&itemspage',
			talk: '&talk'
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

			var numberOfItems = 0;
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

				numberOfPages = Math.ceil(numberOfItems/scope.itemsPerPage);
				scope.paginationNumbers = [];
				
				if(numberOfItems === 0){
					scope.perShow = false;
					scope.pagShow = false;

				}
				if(numberOfItems > scope.itemsPerPage){
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

					
					//scope.talk({e: 'jea'});
				}
			}
			scope.$watch('items', function() {

				numberOfItems = scope.items.length;
				
				

				updatePaginationNumbers();
				
				console.log('numberOfPages: ' + numberOfPages);
				console.log(numberOfItems);
				
							
			});
			//scope.perShow = true;
			//scope.pagShow = true;

		}
	}
}
