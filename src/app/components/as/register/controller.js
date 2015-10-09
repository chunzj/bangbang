/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsRegisterController', AsRegisterController);

  var SUB_AREAS = {
    1: [
      {id: '11', name: '大坪'},
      {id: '12', name: '解放碑'},
      {id: '13', name: '朝天门'}
    ],
    2: [
      {id: '21', name: '两路'},
      {id: '22', name: '新牌坊'},
      {id: '23', name: '汽博'}
    ],
    3: [
      {id: '31', name: '弹子石'},
      {id: '32', name: '会展中心'},
      {id: '33', name: '四公里'}
    ],
    4: [
      {id: '41', name: '观音桥'},
      {id: '42', name: '读书郎'},
      {id: '43', name: '龙头寺'}
    ]
  };

  /** @ngInject */
  function AsRegisterController($scope, $state, $log) {
    var vm = $scope;

    vm.user = {
      lastName: '',
      firstName: '',
      phone: '',
      certificate: '',
      photoUrl: '../../../../ass',
      area: '',
      subArea: '',
      agreed: false
    };

    vm.areas = [
      {id:'1',name:'渝中区'},
      {id:'2',name:'渝北区'},
      {id:'3',name:'南岸区'},
      {id:'4',name:'江北区'}
    ];
    vm.subAreas = [];

    vm.$watch('user.area', function () {
      if (arguments[0]) {
        vm.subAreas = SUB_AREAS[arguments[0].id];
      }
    });

    vm.agreeRegisterProtocol = function () {
      vm.user.agreed = !vm.user.agreed;
    };

    vm.confirmRegister = function () {
      sessionStorage.setItem('userSource', 'as');
      $state.go('registerSuccess');
    };
  }
})();
