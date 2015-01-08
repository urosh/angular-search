'use strict';

/**
 * @ngdoc overview
 * @name starcSearch2App
 * @description
 * # starcSearch2App
 *
 * Main module of the application.
 */
angular
  .module('starcExploreApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'app.commons',
    'app.controlls',
    'app.search',
    'app.map',
    'app.annotations',
    'app.collections',
    'app.d3',
    'app.visualizations',
    'app.statistics',
    'app.stories'
  ]);
  
