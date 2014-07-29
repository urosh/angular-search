'use strict';

/**
 * @ngdoc function
 * @name starcSearchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the starcSearchApp
 */
angular.module('starcSearchApp')
  .controller('AppCtrl', function ($scope, $http, Tools) {
    this.model = {};

    this.model.selectedTools = [];
    this.model.tools = [];
    

    var promise = Tools.getTools();
    var that = this;
    

    promise.then(function(res){
        that.model.tools = res.data;
    });

    this.toolSelected = function(e){
       
        Tools.addObjectFromCollection(this.model.tools, this.model.selectedTools, 'name', e);
    }

    this.removeItem = function(e){
        Tools.removeObjectFromCollection(this.model.selectedTools, 'name', e);
    }
    
    
    

    

    
  });
