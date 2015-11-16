/**
 * Created by ChunZuJun on 2015/10/16.
 *
 */

(function () {
  angular
      .module('bb.cp.common', ['bb.common.util'])
      .directive('fileRead', fileRead);

  var VALID_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpeg', 'image/gif'];
  var MAX_IMG_SIZE = 307200;

  /** @ngInject */
  function fileRead (bbUtil) {
    return {
      restrict: 'E',
      scope: {
        fileData: "=",
        fileModel: '='
      },
      replace: true,
      template: '<input type="file" class="photo-file" fileData="fileData" fileModel="fileModel">',
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          scope.fileModel = changeEvent.target.files[0];

          if (!scope.fileModel || VALID_MIME_TYPE.indexOf(scope.fileModel.type) === -1) {
            bbUtil.errorAlert('请选择正确的图片格式！');
            return;
          }

          if (scope.fileModel.size > MAX_IMG_SIZE) {
            bbUtil.errorAlert('选择的图片文件大小不能超过300kb');
            return;
          }

          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileData = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileModel);
        });
      }
    }
  }
})();
