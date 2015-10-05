/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('PersonalEditController', PersonalEditController);

  /** @ngInject */
  function PersonalEditController($scope, $log) {
    var vm = $scope;

    vm.areas = [
      {id:'1',name:'两路'},
      {id:'2',name:'观音桥'},
      {id:'3',name:'解放碑'}
    ];

    vm.user = {
      phone: '15823456789',
      area: $scope.areas[2],
      photo: '../../../assets/images/personal/photo.jpg'
    };

    //control arrow direction
    vm.showArrow = false;
    vm.changeArrow = function () {
      vm.showArrow = !vm.showArrow;
    }
  }
})();
