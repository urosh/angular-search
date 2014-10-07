CropDirective = function($document){
	
	"use strict";

  var link;
  var imgElement;
	

	var span_tl = angular.element("<span ng-mousedown='mouseDownHandler($event, \"tl\")' class='handler top-left'></span>");
	var span_tr = angular.element("<span ng-mousedown='mouseDownHandler($event, \"tr\")' class='handler top-right'></span>");
	var span_bl = angular.element("<span ng-mousedown='mouseDownHandler($event, \"bl\")' class='handler bottom-left'></span>");
	var span_br = angular.element("<span ng-mousedown='mouseDownHandler($event, \"br\")' class='handler bottom-right'></span>");
	
	var maskElement = angular.element('<div ng-show="imageAdded" class="mask-div"></div>');


  link = function (scope, elm, attrs, myAnnotationCtrl) {
    scope.imageSource = "";
    var startX, startY, initialMouseX, initialMouseY,
      w, h, initialW, initialH, dx,
      dy, top, left, source;

    initialW = 120;
    initialH = 40;


    scope.mouseDownHandler = function ($event, _source_) {
      startX = maskElement.prop('offsetLeft');
      startY = maskElement.prop('offsetTop');

      initialMouseX = $event.clientX;
      initialMouseY = $event.clientY;

      source = _source_;

      $document.bind('mousemove', mousemove);
      $document.bind('mouseup', mouseup);

    };

    scope.initializeMask = function () {
      initialW = 120;
      initialH = 40;
      myAnnotationCtrl.removeNotification();
      var initTop = parseInt(scope.imageH / 2 - initialH / 2);

      var initLeft = parseInt(scope.imageW / 2 - initialW / 2);

      var container = angular.element(elm.children()[0]);
      container.css({
        height: scope.imageH + 20 + 'px'
      });

      maskElement.css({
        top: initTop + 'px',
        left: initLeft + 'px',
        width: initialW + 'px',
        height: initialH + 'px'
      });

      var clip = 'rect(' + initTop + 'px, ' + ( initLeft + initialW ) + 'px, ' + (initTop + initialH) + 'px, ' + initLeft + 'px)';
      imgElement.css({
        top: parseInt(-initTop) + 'px',
        left: parseInt(-initLeft) + 'px',
        clip: clip
      });

      myAnnotationCtrl.setArea(initTop, initLeft, initialW, initialH, scope.docID);
    };

    function mousemove($event) {
      var coef = [];
      switch (source) {
        case 'img':
          coef = [1, 1, 0, 0];
          break;
        case 'tl':
          coef = [1, 1, -1, -1];
          break;
        case 'tr':
          coef = [0, 1, 1, -1];
          break;
        case 'bl':
          coef = [1, 0, -1, 1];
          break;
        case 'br':
          coef = [0, 0, 1, 1];
          break;

      }

      dx = $event.clientX - initialMouseX;
      dy = $event.clientY - initialMouseY;

      left = startX + coef[0] * dx;
      top = startY + coef[1] * dy;
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }

      if (left + initialW + coef[2] * dx < scope.imageW) {
        w = initialW + coef[2] * dx;
      }
      if (top + initialH + coef[3] * dy < scope.imageH) {
        h = initialH + coef[3] * dy;
      }

      if ((left + w) < scope.imageW && (top + h) < scope.imageH && w > 5 && h > 5) {
        maskElement.css({
          top: top + 'px',
          left: left + 'px',
          width: w + 'px',
          height: h + 'px'
        });

        var clip = 'rect(' + top + 'px, ' + ( left + w ) + 'px, ' + (top + h) + 'px, ' + left + 'px)';
        imgElement.css({
          top: parseInt(-top) + 'px',
          left: parseInt(-left) + 'px',
          clip: clip

        });
      }


      return false;
    }

    function mouseup() {
      initialW = w;
      initialH = h;
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
      myAnnotationCtrl.setArea(top, left, w, h, scope.docID);
    }
  };

	return {
		restrict: 'E',
		
		require: '^myAnnotation',
		template: '<div class="image-container"><img width="350" class="img-original" ng-src="{{ imageSource }}"></div>',
		controller: CropController, 

		compile: function(tElem){
			
			maskElement.append(span_tl);
			maskElement.append(span_tr);
			maskElement.append(span_bl);
			maskElement.append(span_br);
			imgElement = angular.element('<img width="350" ng-mousedown="mouseDownHandler($event, \'img\')" class="img-mask" ng-src="{{imageSource}}">');
			maskElement.append(imgElement);

			var el = angular.element(tElem.children()[0]);
			el.append(maskElement);
			return link;
		}
		
	};

}
