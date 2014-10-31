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
  .module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'app.commons',
    'app.controlls',
    'mySearchModule',
    'mapModule',
    'app.collections',
    'app.d3',
    'myStatistics',
    'app.annotations',
    'visualizationModule'

  ]);
  
