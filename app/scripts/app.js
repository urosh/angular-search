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
    'myModule',
    'my-services',
    'akoenig.deckgrid',
    'google-maps',
    'my-controlls',
    'common-services'
  ]);
  
