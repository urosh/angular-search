/**
 * Created by urosdamnjanovic on 10/7/14.
 */
ListannotationDirective = function(){
  return {
    restrict: 'E',
    replace: true,
    scope:{
      imageSource: '=imsource',
      imageH: '=imageh',
      list: '='
    },
    controller: function($scope){

    },
    templateUrl: 'scripts/annotations/templates/list.tpl.html',
    link: function(scope, element, attrs){
      scope.$watch('imageSource', function(){
        if(scope.imageSource){
          //var dEl = angular.element(element.children()[2]);
          //dEl.css({top: (scope.imageH + 5) + 'px'});
          scope.annotationSelected = false;
        }

      });

      scope.selectAnnotation = function(item){
        scope.annotationSelected = true;
        var mEl = angular.element(element.children()[1]);
        mEl.css({
          width: item.coordinates.width + 'px',
          height: item.coordinates.height + 'px',
          top: item.coordinates.top + 'px',
          left: item.coordinates.left + 'px'
        });
        console.log(item);
        scope.title = item.title;
        scope.description = item.description;

      }

    }
  }
}