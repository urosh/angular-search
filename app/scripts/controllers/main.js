'use strict';

/**
 * @ngdoc function
 * @name starcSearchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the starcSearchApp
 */
angular.module('starcSearchApp')
  .controller('AppCtrl', function ($scope) {
    this.optionSelected = function(){
    	this.tools.push(this.option);
    };
    this.dir = 'my-first-tool';
    this.showText = true;
    this.items = [
    	{id: 1, name: 'foo', template:'views/tool1.html'},
    	{id: 2, name: 'bar', template:'views/tool2.html'},
    	{id: 3, name: 'blah', template:'views/tool3.html'},
        {id: 3, name: 'ajme', template:'views/tool3.html'}
    ];

    
    this.tools = [];

    this.option = "";

  });
