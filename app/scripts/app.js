'use strict';

/**
 * @ngdoc overview
 * @name starcSearchApp
 * @description
 * # starcSearchApp
 *
 * Main module of the application.
 */
angular
  .module('starcSearchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'my-services',
    
    'common-services',
    'my-controlls',
    'mySearchModule',
    'mapModule'
  ]);
  
