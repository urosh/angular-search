/**
 * Created by urosdamnjanovic on 10/13/14.
 */


angular.module('visualizationModule', []);

angular.module('visualizationModule')
  .controller('VisController', ['$scope', 'visService', function($scope, visService){

    this.resultsActive = false;

    this.visList = visService.getVisList();

    this.selectTool = function(index){
      visService.visSelected(index);
      this.visList = visService.getVisList();

    };





  }]);

angular.module('visualizationModule')
  .service('visService', ['DataModel', function(DataModel){
    var visList = [
      {'name' : 'upload distribution', 'visible': false},
      {'name' : 'object types', 'visible': false},
      {'name' : 'relations', 'visible': false}
    ];

    this.visSelected = function(index){
      _.each(visList, function(item){
        item.visible = false;
      });
      visList[index].visible = true;

    };

    this.getVisList = function(){
      return visList;
    };

    this.getResultsData = function(data){
      var results = DataModel.getResults();
      var newData = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < results.length; j++) {
          if(data[i].docID === results[j].docID){
            newData.push(data[i]);
          }

        }
      }

      return newData;
    };



    return this;
  }]);

