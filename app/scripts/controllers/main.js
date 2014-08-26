'use strict';

/**
 * @ngdoc function
 * @name starcSearchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the starcSearchApp
 */
angular.module('starcSearchApp')
  .controller('AppCtrl', function ($scope, $http, $filter, DataModel,  Tools, serverServices) {
    this.model = {};

    // this.model.selectedTools = [];
    // this.model.tools = [];
    
    this.model.collections = [];
    this.model.types = [];
    this.model.selectedCollections = [];
    this.model.selectedTypes = [];
    this.model.searchResults = [];
    
    this.model.markers = [
        // { 'id': '1', latitude: 45, longitude: -73},
        // { 'id': '2', latitude: 44, longitude: -73}

    ];

   
    
    

    
  });
