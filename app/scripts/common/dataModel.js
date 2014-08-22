'use strict';

angular.module('common-services')
	.service('DataModel', function(CommonServices){
		this.model = {};

		// Tools selection. Adding and removing tools to the workspace
		this.selectedTools = [];
		this.selectTool = function(tools, e){
			CommonServices.addObjectFromCollection(tools, this.selectedTools, 'name', e);
		};

		this.removeTool = function(e){
			CommonServices.removeObjectFromCollection(this.selectedTools, 'name', e);
		};
		// ************************************************


		this.model.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
    };



		//this.model.selectedTools = selectedTools;


	})