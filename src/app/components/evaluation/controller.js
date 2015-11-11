/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('EvaluationController', EvaluationController);

  /** @ngInject */
  function EvaluationController($scope, $stateParams, $window, $log, ajaxRequest, bbUtil, bbConstant) {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));

    var vm = $scope;
    vm.constant = bbConstant;

    vm.pageTitle = bbUtil.getPageTitle(userInfo.identity);

    var evaluationType = $stateParams.type, orderId = $stateParams.orderId;
    vm.evaluationType = evaluationType;

    var orderDetail = $window.codeOrders[orderId] || {};
    vm.bangbang = {
      name: orderDetail.user.name || '',
      avatar: orderDetail.user.avatar || '',
      level: orderDetail.level.text || ''
    };

    vm.stars = [
      {selected: true},
      {selected: true},
      {selected: true},
      {selected: false},
      {selected: false}
    ];
    vm.starToggle = function (idx) {
      vm.stars[idx].selected = !vm.stars[idx].selected;
      if (vm.stars[idx].selected) {
        vm.stars.forEach(function (item, index) {
          if (index < idx) {
            item.selected = true;
          }
        });
      } else {
        vm.stars.forEach(function (item, index) {
          if (index > idx) {
            item.selected = false;
          }
        });
      }
    };

    vm.goodbad = [
      {
        name: '好 评',
        checked: true,
        cls: 'good'
      },
      {
        name: '差评投诉',
        checked: false,
        cls: 'bad'
      }
    ];
    vm.checkGB = function (idx) {
      vm.goodbad[idx].checked = !vm.goodbad[idx].checked;
      if (vm.goodbad[idx].checked) {
        vm.goodbad.forEach(function (item, index) {
          if (idx !== index) {
            item.checked = false;
          }
        });
      }
    };

    vm.commitEvaluation = function () {
      var options = {
        userId: userInfo.userId,
        orderId: orderId,
        message: vm.construction || ''
      };

      if (evaluationType == bbConstant.evaluationType.GB) {
        var checkGB = vm.goodbad.some(function (item) {
          return item.checked;
        });

        if (!checkGB) {
          bbUtil.errorAlert('请选择评价!');
          return;
        } else {
          angular.extend(options, {
            good: vm.goodbad[0].checked,
            star: 0
          });
        }
      } else if (evaluationType == bbConstant.evaluationType.STAR) {
        var checkStar = vm.stars.some(function (item) {
          return item.selected;
        });

        if (!checkStar) {
          bbUtil.errorAlert('请选择评价!');
          return;
        } else {

          var checkedStarNum = vm.stars.filter(function (item) {
            return item.selected;
          });

          angular.extend(options, {
            good: false,
            star: checkedStarNum.length
          });
        }
      } else {
        bbUtil.errorAlert('不被支持的评价方式!');
        return;
      }

      ajaxRequest.post(options, 'evaluation').then(function () {
        $state.go('evaluationSuccess', {type:evaluationType});
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    }
  }
})();
