/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MyCommentController', MyCommentController);

  /** @ngInject */
  function MyCommentController($scope, $log, ajaxRequest, bbUtil) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || (!userInfo.identity || !userInfo.userId)) {
      $state.go('main');
      return;
    }

    vm.yellowStarArray = function (starNum) {
      starNum = Number(starNum);
      var res = [];
      for (var i = 0; i < starNum; i++) {
        res.push(i);
      }
      return res;
    };

    vm.yellowDefaultArray = function (starNum) {
      starNum = Number(starNum);
      var res = [];
      for (var i = starNum; i < 5; i++) {
        res.push(i);
      }
      return res;
    };

    vm.confirmBack = function () {
      history.back();
    };

    vm.pageTitle = bbUtil.getPageTitle();
    if (userInfo.level) {
      vm.user = {
        level: userInfo.level,
        point: userInfo.point
      };
    }

    ajaxRequest.get({
      userId: userInfo.userId,
      identity: userInfo.identity,
      auth: true
    }, 'comment').then(function (data) {
      $log.info('Success to get user comment records for ' + userInfo.identity);
      vm.comments = data;
    }).catch(function (err) {
      bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
        history.back();
      });
    });
  }
})();

