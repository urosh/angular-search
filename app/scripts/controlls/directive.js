'use strict';


function ControllsDirective(){
	return {
		restrict: 'A',
		scope: {
			tools: '=',
			select: '&'
		},
		template: '<div class="wrapper-demo">' + 
		      	  '<div id="dd" ng-class="(active) ? \'wrapper-dropdown active\' : \'wrapper-dropdown \'"  ng-click="active=!active" tabindex="1">' +
        			'Select tools' +
        			'<ul  class="dropdown">' +
        			'<li ng-repeat="tool in tools"><a href="#" ng-click="select({e: tool.name })">{{ tool.name }}</a></li>'+
              
              '</ul></div></div>',
    link: function(scope){
    	console.log('we are now in a linking function');
    	scope.active = false;
    	
    } 
	}
};


function SelectedItemsDirective(){
	return {
		restrict: 'A',
		scope: {
			tools: '=',
			remove:'&'
		},
		
		template: '<div class="dropdown-item" ng-repeat="tool in tools">'+
							'<div class="item-name">{{ tool.name }}</div>'+
							'<div class="icon-remove" ng-click="remove({e: tool.name})"></div>'+
							'</div>'
		
								
           
	}
};

