'use strict';


var myControlls = angular.module('my-controlls', []);






myControlls.service('ControllsService', ControllsServiceFunction);

myControlls.directive('selectedTools', SelectedItemsDirective);


myControlls.directive('myDropdown', ControllsDirective);



	