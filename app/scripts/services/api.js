'use strict';

/**
 * @ngdoc provider
 * @name atlasApp.api
 * @description
 * # api
 * Provider in the atlasApp.
 */
angular.module('atlasApp')
  .provider('api', function() {
    //this.url = '//localhost:8080/';
    this.url = '//api.hoste.ro/';
    this.version = 'v1';

    this.$get = function() {
      return {
        url: this.url,
        version: this.version
      };
    };
  });