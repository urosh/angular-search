'use strict';

function DialogDirective(){
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
		controller: function(){

		},
		link: function(){

		}
	}
}