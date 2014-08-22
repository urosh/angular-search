'use strict';


angular.module('my-controlls', []);




angular.module('my-controlls')
	.controller('ControllsController', function(ControllsService, CommonServices, DataModel){
		this.selectedTools = DataModel.selectedTools;
		this.tools = [];

		var promise = ControllsService.getTools();
  	var that = this;
    

    promise.then(function(res){
      that.tools = res.data;
    });

		this.toolSelected = function(e){
			DataModel.selectTool(this.tools, e);
			
    };

    this.removeItem = function(e){
    	DataModel.removeTool(e);
      //CommonServices.removeObjectFromCollection(DataModel.model.selectedTools, 'name', e);
    };


	});

angular.module('my-controlls')
	.service('ControllsService', ControllsService);

angular.module('my-controlls')
	.directive('selectedItems', SelectedItemsDirective);


angular.module('my-controlls')
	.directive('myDropdown', ControllsDirective);



	


// angular.module('controlls')
// 	.factory('controllFactory', ['', function(){
// 		return function (){
			
// 		};
// 	}])