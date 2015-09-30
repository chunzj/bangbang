/**
 * Created by ChunZuJun on 2015/9/30.
 *
 */
angular.module("bb.cp.common",[]),angular.module("bb.cp.common").directive("header",function(){return{restrict:"A",templateUrl:"app/common/header/index.html",scope:{title:"@"}}}),function(){"use strict";function t(t,n){t.debugEnabled(!0),n.allowHtml=!0,n.timeOut=3e3,n.positionClass="toast-center-center",n.preventDuplicates=!0,n.progressBar=!0}function n(t,n){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),n.otherwise("/")}function e(t){t.debug("runBlock end")}t.$inject=["$logProvider","toastrConfig"],n.$inject=["$stateProvider","$urlRouterProvider"],e.$inject=["$log"],angular.module("bb",["ngCookies","ngSanitize","ngMessages","ngAria","ui.router","toastr"]).constant("moment",moment).config(t).config(n).run(e)}(),function(){"use strict";function t(){function t(){return n}var n=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Sass (Ruby)",url:"http://sass-lang.com/",description:"Original Syntactically Awesome StyleSheets implemented in Ruby",logo:"ruby-sass.png"}];this.getTec=t}angular.module("bb").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var n=this;n.relativeDate=t(n.creationDate).fromNow()}var n={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],n}angular.module("bb").directive("acmeNavbar",t)}(),function(){"use strict";function t(t,n){function e(e){function o(t){return t.data}function r(n){t.error("XHR Failed for getContributors.\n"+angular.toJson(n.data,!0))}return e||(e=30),n.get(a+"/contributors?per_page="+e).then(o)["catch"](r)}var a="https://api.github.com/repos/Swiip/generator-gulp-angular",o={apiHost:a,getContributors:e};return o}angular.module("bb").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){function t(){var t=document.body.clientWidth;t>n&&(t=n),document.querySelector("html").style["font-size"]=t/1080*62.5+"%",e=null}var n=640,e=null;window.onresize=function(){e&&clearTimeout(e),e=setTimeout(t,100)},t()}(),function(){"use strict";function t(t,n,e){function a(){r(),t(function(){i.classAnimation="rubberBand"},1e3)}function o(){e.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function r(){i.awesomeThings=n.getTec(),angular.forEach(i.awesomeThings,function(t){t.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1443582553843,i.showToastr=o,a()}angular.module("bb").controller("MainController",t),t.$inject=["$timeout","webDevTec","toastr"]}(),angular.module("bb").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="container"><div><acme-navbar creation-date="main.creationDate"></acme-navbar></div><div class="jumbotron"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><a class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</a></p><p>With 鈾� thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="col" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{ awesomeThing.url }}">{{ awesomeThing.url }}</a></p></div></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav class="navbar"><a href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</a><ul><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></nav>'),t.put("app/components/common/header/index.html","")}]);
//# sourceMappingURL=../maps/scripts/app-54a7abf2a2.js.map