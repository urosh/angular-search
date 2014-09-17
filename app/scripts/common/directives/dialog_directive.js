'use strict';

function DialogDirective($timeout){
	return {
		restrict: 'E', 
		templateUrl: 'scripts/common/templates/dialog.tpl.html',
		scope: {
			text: '=',
			response: '&',
			type: '=',
			classes: '='
		},
		replace: true,
		controller: function($scope){
			
		}
	}
};

DialogDirective.$inject = ['$timeout'];