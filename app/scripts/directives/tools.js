'use strict';

var directives = {};

directives.myFirstTool = function(){
	return {
		restrict: 'A',
		template: '<div>First</div>'
	};
};

directives.mySecondTool = function(){
	return {
		restrict: 'A',
		template: '<div>Second</div>'
	};
};

directives.myThirdTool = function(){
	return {
		restrict: 'A',
		template: '<div>Third</div>'
	};
};

directives.myFourthTool = function(){
	return {
		restrict: 'A',
		template: '<div>Fourth</div>'
	};
};

angular.module('starcSearchApp').directive(directives);
