'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:WalletsCtrl
 * @description
 * # WalletsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('WalletsCtrl', function($scope, $state, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var _this = this;

    _this.state = $state;

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      localStorage.setItem('account', JSON.stringify(_account));

      _this.wallet_webdollar = _account.wallet_webdollar;
      _this.mining_pool_url_webdollar = _account.mining_pool_url_webdollar;

      _this.wallet_nerva = _account.wallet_nerva;

      _this.wallet_webchain = _account.wallet_webchain;
      _this.password_webchain = _account.password_webchain;
      _this.mining_pool_url_webchain = _account.mining_pool_url_webchain;

      _this.wallet_veruscoin = _account.wallet_veruscoin;
      _this.password_veruscoin = _account.password_veruscoin;
      _this.mining_pool_url_veruscoin = _account.mining_pool_url_veruscoin;
    });

    _this.update = function() {
      accountsService.update({
        id: account.id
      }, {
        wallet_webdollar: _this.wallet_webdollar,
        mining_pool_url_webdollar: _this.mining_pool_url_webdollar,
        wallet_nerva: _this.wallet_nerva,
        wallet_webchain: _this.wallet_webchain,
        password_webchain: _this.password_webchain,
        mining_pool_url_webchain: _this.mining_pool_url_webchain,
        wallet_veruscoin: _this.wallet_veruscoin,
        password_veruscoin: _this.password_veruscoin,
        mining_pool_url_veruscoin: _this.mining_pool_url_veruscoin
      }).$promise.then(function() {
        window.toastr.success('Wallet was updated');

        $state.reload();
      });
    };
  });
