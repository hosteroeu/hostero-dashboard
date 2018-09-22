'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersDetailsCtrl
 * @description
 * # MinersDetailsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersDetailsCtrl', function(miner, minersService, hostsService, $state, $scope, $mdBottomSheet) {
    $scope.details = function() {
      $mdBottomSheet.hide();

      $state.go('miner', {
        miner: miner.id
      });
    };

    $scope.logs = function() {
      $mdBottomSheet.hide();

      $state.go('miner_logs', {
        miner: miner.id
      });
    };

    $scope.remove = function() {
      $mdBottomSheet.hide();

      minersService.remove({
        id: miner.id
      }).$promise.then(function() {
        if ($state.current.name === 'miners') {
          $state.reload();
        } else {
          $state.go('miners');
        }

        hostsService.update({
            id: miner.host_id
          }, {
            deployed: '0'
          }).$promise
          .then(console.log)
          .catch(console.error);
      });
    };
  });
