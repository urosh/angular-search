'use strict';

function CollectionsDirective(){
	return{
		restrict: 'E',
		templateUrl: 'scripts/collections/templates/collections.tpl.html',
		controller: CollectionsController,
		link: function(scope, element){
			
			scope.itemActive = function(index){
				for (var i = 0; i < scope.items.length; i++) {
					scope.items[i].active = false;
				}
				scope.items[index].active = true;
			};

		}
	}
};