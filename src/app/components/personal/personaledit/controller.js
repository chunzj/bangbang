/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('PersonalEditController', PersonalEditController);

  /** @ngInject */
  function PersonalEditController($scope, $state, $log, ajaxRequest, bbUtil, bbConstant) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));

    vm.user = {
      phone: userInfo.phone,
      avatar: userInfo.avatar,
      photoUrl: userInfo.avatar
    };

    vm.source = userInfo.identity;
    vm.isBangBang = vm.source === bbConstant.userSource.as;
    vm.pageTitle = bbUtil.getPageTitle(vm.source);

    if (vm.isBangBang) {
      var serviceArea = userInfo.serviceArea,
        serviceAreaData = serviceArea.split('-');

      if(serviceAreaData) {
        angular.extend(vm.user, {
          area: serviceAreaData[0],
          subArea: serviceAreaData[1]
        });
      }
    }

    var areasObj = bbUtil.formatAreas(), subAreas = areasObj.subAreas;
    vm.areas = areasObj.areas;
    vm.subAreas = [];

    vm.$watch('user.area', function (){
      if (arguments[0]) {
        vm.subAreas = subAreas[arguments[0].id];
      }
    });

    vm.saveInfo = function () {

      if (!vm.user.phone) {
        bbUtil.errorAlert('请输入您的手机号码！');
        return;
      } else if (!bbUtil.validatePhone(vm.user.phone)) {
        bbUtil.errorAlert('请输入有效的手机号码！');
        return;
      }

      if (vm.isBangBang) {
        if(!vm.user.subArea) {
          bbUtil.errorAlert('请选择您的服务区域！');
          return;
        } else if (angular.isString(vm.user.subArea) && angular.isObject(vm.user.area)) {
          bbUtil.errorAlert('请选择您的服务区域！');
          return;
        }
      }

      var changedUserInfo = {
        userId: userInfo.userId,
        phone: vm.user.phone,
        avatar: vm.user.photoUrl,
        auth: true
      }, isChangedAvatar = vm.user.photoUrl instanceof File;

      if (vm.isBangBang) {
        if (angular.isString(vm.user.subArea)) {
          changedUserInfo.serviceArea = vm.user.area + '-' + vm.user.subArea;
        } else if (angular.isObject(vm.user.subArea)) {
          changedUserInfo.serviceArea = vm.user.subArea.id;
        }
      }

      doModify(ajaxRequest, changedUserInfo, isChangedAvatar, vm.source + 'Personal').then(function(data) {

        $log.info('Success to modify ' + vm.source + ' info ');
        angular.extend(userInfo, {
          phone: changedUserInfo.phone
        });

        // current user is bangbang, that update service area
        if (vm.isBangBang) {
          angular.extend(userInfo, {
            serviceArea: changedUserInfo.serviceArea
          });
        }

        // if response data return new avatar, that update it
        if (data && data.avatar) {
          angular.extend(userInfo, {
            avatar: data.avatar
          });
        }

        //update cache
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        $state.go('personalCenter');

      }).catch(function(err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };
  }

  function doModify(ajaxRequest, changedUserInfo, isChangedAvatar, apiPath) {
    if (isChangedAvatar) {
      var options = {
        userId: changedUserInfo.userId,
        phone: changedUserInfo.phone,
        auth: changedUserInfo.auth
      };

      if (changedUserInfo.serviceArea) {
        options.serviceArea = changedUserInfo.serviceArea;
      }

      return ajaxRequest.fileUpload(options, 'avatar', changedUserInfo.avatar, apiPath);
    } else {
      return ajaxRequest.post(changedUserInfo, apiPath);
    }
  }
})();
