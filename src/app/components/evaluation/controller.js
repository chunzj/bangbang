/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('EvaluationController', EvaluationController);

  /** @ngInject */
  function EvaluationController($scope, $stateParams, $log, bbUtil, bbConstant) {
    var vm = $scope;
    vm.constant = bbConstant;

    vm.pageTitle = bbUtil.getPageTitle(vm.source);

    var evaluationType = $stateParams.type, orderId = $stateParams.orderId;
    vm.evaluationType = evaluationType;
    vm.user = {
      photo: '../../../../assets/images/personal/photo.jpg',
      bbLevel: {
        level: '',
        text: '金棒棒'
      },
      name: 'A棒棒',
      id: ''
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
        checked: false,
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
  }
})();
