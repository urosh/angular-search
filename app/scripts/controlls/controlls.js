'use strict';

angular.module('my-controlls', []);

angular.module('my-controlls')
	.service('ControllsService', ControllsService);

angular.module('my-controlls')
	.directive('myDropdown', DropdownDirective);	

angular.module('my-controlls')
	.directive('selectedTools', ToolsDirective);	