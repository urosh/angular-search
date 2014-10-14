/**
 * Created by urosdamnjanovic on 10/13/14.
 */


angular.module('visualizationModule', []);

angular.module('visualizationModule')
  .controller('VisController', ['$scope', 'visService', function($scope, visService){

    this.resActive = false;

    this.visList = visService.getVisList();

    this.selectTool = function(index){
      visService.visSelected(index);
      this.visList = visService.getVisList();
      console.log(this.visList);
    };



  }]);

angular.module('visualizationModule')
  .service('visService', function(){
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

    return this;
  });

