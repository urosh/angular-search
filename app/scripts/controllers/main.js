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

    this.model.displayItems = [];
    this.model = DataModel.model;
    
    this.typeSelected = function(e){
      Tools.addItemToArray(this.model.selectedTypes, e);
    };
    
    


    // this.collectionSelected = function(e, i){
    //   Tools.addItemToArray(this.model.selectedCollections, e);
    // };

    // var promise = Tools.getTools();
    // var that = this;
    

    // promise.then(function(res){
    //   that.model.tools = res.data;
    // });

    // this.toolSelected = function(e){
       
    //   Tools.addObjectFromCollection(this.model.tools, this.model.selectedTools, 'name', e);
    // };


    // this.removeItem = function(e){
    //   Tools.removeObjectFromCollection(this.model.selectedTools, 'name', e);
    // };

    // this.search = function(){
    //   // first populate data
    //   var queryData = {
    //       'search' : this.model.query,
    //       'types' : this.model.selectedTypes,
    //       'collections' : this.model.selectedCollections 
    //   }
    //   console.log(queryData);
      
    //   var results = serverServices.runSearch(queryData);
    //   results.then(function(res){
    //     console.log(res.data);
    //     that.model.searchResults = res.data;
    //     that.model.displayItems = res.data;
    //     for(var key in res.data){
    //       if(res.data[key].lat && res.data[key].lng && res.data[key].lat!='0'){
    //         var add = true;
    //         for(var i in that.model.markers){
    //           if( that.model.markers[i]['latitude'] === res.data[key].lat && that.model.markers[i]['longitude'] === res.data[key].lng ) {
    //             add = false
    //           }
    //         }
    //         if(add){
    //           that.model.markers.push(
    //             {
    //               id: key, 
    //               latitude: res.data[key].lat, 
    //               longitude: res.data[key].lng,
    //               clicked: false,
                  
    //             }
    //           );  
    //         }
            
    //       }
    //     }

    //     _.each(that.model.markers, function(marker){
    //       marker.onClicked = function(){
    //         if(marker.clicked){
    //           marker.icon=null;
    //           that.model.displayItems = that.model.searchResults;
               
    //           marker.clicked = false;
    //         }else{
    //           _.each(that.model.markers, function(thatMarker){
    //             if( thatMarker!=marker && thatMarker.icon ){
    //               thatMarker.icon = null;
    //             }
    //           })
    //           marker.icon = 'images/green.png';
    //           that.model.displayItems = $filter('filter')(that.model.searchResults, function(item){
    //             if(item.lat == marker.latitude && item.lng == marker.longitude){
    //               return true;
    //             }else{
    //               false;
    //             }
    //           });
    //           marker.clicked = true;

    //         }
            
            
    //       }
    //     });



          
    //   })
        
    // };


    // var collections = serverServices.initializeSearch();
    // collections.then(function(res){
    //   that.model.collections = res.data.collections;
    //   that.model.types = res.data.types;
      
    // });

    

    // this.onMarkerClicked = function(marker){
    //   console.log(marker);
    // }
    
    

    

    
  });
