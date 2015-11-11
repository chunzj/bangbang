/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookDemandController', LookDemandController);

  /** @ngInject */
  function LookDemandController($scope, $state, $log, ajaxRequest, bbUtil) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      $state.go('main');
      return;
    }

    vm.subscribe = function () {
      var orderDetail = vm.orderDetail;
      if (!orderDetail.servicePlace) {
        bbUtil.errorAlert('请填写您的服务地点!');
        return;
      }

      if (!orderDetail.destination) {
        bbUtil.errorAlert('请填写您的到达地!');
        return;
      }

      if (!orderDetail.bbLevel) {
        bbUtil.errorAlert('请选择您要服务的棒棒级别!');
        return;
      }

      if (!orderDetail.demand) {
        bbUtil.errorAlert('请填写您的需求信息!');
        return;
      }

      if (!orderDetail.serviceStartTime) {
        bbUtil.errorAlert('请输入服务开始时间!');
        return;
      }

      if (!orderDetail.serviceEndTime) {
        bbUtil.errorAlert('请输入服务结束时间!');
        return;
      }

      if (orderDetail.serviceStartTime.getTime() >= orderDetail.serviceEndTime.getTime()) {
        bbUtil.errorAlert('服务开始时间不能晚于或等于服务结束时间!');
        return;
      }

      if (!orderDetail.salary) {
        bbUtil.errorAlert('请输入您愿意付出的薪水!');
        return;
      } else if (/\D+/g.test(orderDetail.salary)) {
        bbUtil.errorAlert('请输入有效的佣金!');
        return;
      }

      orderDetail.userId = userInfo.userId;
      orderDetail.auth = true;
      orderDetail.bbLevel = orderDetail.bbLevel.id;
      orderDetail.serviceStartTime = bbUtil.addCurrentYear(orderDetail.serviceStartTime);
      orderDetail.serviceEndTime = bbUtil.addCurrentYear(orderDetail.serviceEndTime);


      ajaxRequest.post(orderDetail, 'demandHelpSend').then(function (data) {
        $log.info('Subscribe current order');
        $state.go('lookMyOrders');
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    vm.bbLevelOptions = bbUtil.formatLevel().levels;
  }
})();
