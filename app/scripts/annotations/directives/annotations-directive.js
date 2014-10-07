AnnotationsDirective = function($timeout, annotationsService){
	"use strict";

	return {
		restrict: 'E',
		scope: {},
		controller: AnnotationsController,
		templateUrl: 'scripts/annotations/templates/annotations.tpl.html'
		

		
	};

};

AnnotationsDirective.$inject = ["$timeout", "annotationsService"];
