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
    'my-controlls',
    'mySearchModule',
    'mapModule',
    'ngTinyScrollbar',
    'app.collections',
    'd3',
    'myStatistics',
    'app.annotations',
    'visualizationModule'

  ]);
  
