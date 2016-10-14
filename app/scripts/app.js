'use strict';

/**
 * @ngdoc overview
 * @name atlasApp
 * @description
 * # atlasApp
 *
 * Main module of the application.
 */
angular
  .module('atlasApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'auth0.lock',
    'angular-jwt'
  ])
  .config(function($routeProvider, lockProvider, $httpProvider, jwtOptionsProvider, jwtInterceptorProvider) {
    lockProvider.init({
      clientID: 'E6Zeo9d6DEXfEeFyvBPeYw3tYdtYNVDP',
      domain: 'morion4000.auth0.com'
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl'
      })
      .when('/instances', {
        templateUrl: 'views/instances.html',
        controller: 'InstancesCtrl',
        controllerAs: 'instancesCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, authService, authManager, lock, jwtHelper) {
    lock.interceptHash();

    $rootScope.authService = authService;

    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    //authManager.checkAuthOnRefresh();

    // When a location change is detected
    $rootScope.$on('$locationChangeStart', function() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          //valid stored token - use it
          return localStorage.getItem('id_token');
        } else {
          console.log('id_token has expired - removing from localstorage')
          localStorage.removeItem('id_token');
        }
      } else {
        $location.path('/login');
      }
    });

    // Listen for 401 unauthorized requests and redirect
    // the user to the login page
    authManager.redirectWhenUnauthenticated();
  });
