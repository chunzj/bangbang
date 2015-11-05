/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MyCommentController', MyCommentController);

  /** @ngInject */
  function MyCommentController($scope, $log, bbConstant) {
    var vm = $scope;

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

    vm.pageTitle = '';

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var source = userInfo.identity;
    if (source === bbConstant.userSource.look) {
      vm.pageTitle = 'E棒棒-找棒棒';

      vm.comments = [
        {
          theme: '帮你办',
          date: {
            text: '评价时间',
            time: '2015/01/02'
          },
          user: {
            name: 'A师傅',
            phone: '18627782281'
          },
          star: 3
        },
        {
          theme: '帮你订',
          date: {
            text: '评价时间',
            time: '2015/01/02'
          },
          user: {
            name: 'A师傅',
            phone: '18627782281'
          },
          star: 4
        },
        {
          theme: '帮你订',
          date: {
            text: '评价时间',
            time: '2015/01/02'
          },
          user: {
            name: 'A师傅',
            phone: '18627782281'
          },
          star: 4
        },
        {
          theme: '帮你订',
          date: {
            text: '评价时间',
            time: '2015/01/02'
          },
          user: {
            name: 'A师傅',
            phone: '18627782281'
          },
          star: 2
        }
      ];
    } else if (source === bbConstant.userSource.as) {
      vm.pageTitle = 'E棒棒-当棒棒';

      vm.user = {
        bbLevel: {
          level: '',
          name: '金棒棒'
        },
        point: 50
      };

      vm.comments = [
        {
          theme: '帮你办',
          date: {
            text: '获得时间',
            time: '2015/01/02'
          },
          star: 3,
          point: '+0分'
        },
        {
          theme: '帮你订',
          date: {
            text: '支出时间',
            time: '2015/01/02'
          },
          star: 4,
          point: '+1分'
        },
        {
          theme: '帮你订',
          date: {
            text: '获得时间',
            time: '2015/01/02'
          },
          star: 4,
          point: '+1分'
        },
        {
          theme: '帮你订',
          date: {
            text: '获得时间',
            time: '2015/01/02'
          },
          star: 2,
          point: '-1分'
        }
      ];
    }
  }
})();

