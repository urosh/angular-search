'use strict';

/**
 * @ngdoc function
 * @name starcSearchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the starcSearchApp
 */
angular.module('starcSearchApp')
  .controller('AppCtrl', function ($scope, $http, Tools, serverServices) {
    this.model = {};

    this.model.selectedTools = [];
    this.model.tools = [];
    this.model.collections = [];
    this.model.types = [];
    this.model.selectedCollections = [];
    this.model.selectedTypes = [];

    this.typeSelected = function(e){
        Tools.addItemToArray(this.model.selectedTypes, e);
    }

    this.collectionSelected = function(e, i){
        Tools.addItemToArray(this.model.selectedCollections, e);
    };

    var promise = Tools.getTools();
    var that = this;
    

    promise.then(function(res){
        that.model.tools = res.data;
    });

    this.toolSelected = function(e){
       
        Tools.addObjectFromCollection(this.model.tools, this.model.selectedTools, 'name', e);
    };


    this.removeItem = function(e){
        Tools.removeObjectFromCollection(this.model.selectedTools, 'name', e);
    };

    this.search = function(){
        // first populate data
        var queryData = {
            'search' : this.model.query,
            'types' : this.model.selectedTypes,
            'collections' : this.model.selectedCollections 
        }
        console.log(queryData);
        var results = serverServices.runSearch(queryData);
        results.then(function(res){
            console.log('we have results');
            console.log(res.data);
        })
    };


    var collections = serverServices.initializeSearch();
    collections.then(function(res){
        that.model.collections = res.data.collections;
        that.model.types = res.data.types;
        
    })
    
    

    

    
  });
