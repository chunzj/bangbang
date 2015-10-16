/**
 * Created by ChunZuJun on 2015/10/16.
 *
 */

(function () {
  angular
      .module('bb.cp.common', ['bb.common.util'])
      .directive('fileRead', fileRead);

  var VALID_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpeg', 'image/gif'];

  /** @ngInject */
  function fileRead (bbUtil) {
    return {
      restrict: 'E',
      scope: {
        fileData: "=",
        fileModel: '='
      },
      replace: true,
      template: '<input type="file" fileData="fileData" fileModel="fileModel">',
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          scope.fileModel = changeEvent.target.files[0];

          if (!scope.fileModel || VALID_MIME_TYPE.indexOf(scope.fileModel.type) === -1) {
            bbUtil.errorAlert('请选择正确的图片格式！');
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