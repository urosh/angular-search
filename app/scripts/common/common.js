'use strict';

angular.module('commons', []);

angular.module('commons')
	.service('CommonServices', CommonService);

angular.module('commons')
	.factory('requestNotificationChannel', RequestFactory);

angular.module('commons')
	.factory('display', DisplayFactory);


angular.module('commons')
	.service('DataModel', DataModel);




angular.module('commons')
	.directive('preloader', PreloaderDirective);

angular.module('commons')
	.directive('myModal', ModalDirective);

angular.module('commons')
	.directive('myDialog', DialogDirective);
	