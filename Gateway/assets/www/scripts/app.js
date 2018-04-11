/**
 *  应用程序入口.
 */
define(['common'], function (angularAMD) {
	'use strict';
  	var app = angular.module('framework', ['ionic', 'ngResource','ng-mfb','highcharts-ng']);
	app.run(function($ionicPlatform,$rootScope,$location,$ionicPopup,$http) {
	    $ionicPlatform.ready(function() {
		});
        $ionicPlatform.ready(function() {
            // 监听返回键退出程序
            var deregister = $ionicPlatform.registerBackButtonAction(function (e) {
                e.preventDefault();
                function showConfirm() {
                    var confirmPopup = $ionicPopup.confirm({
                        title: '<strong>退出应用?</strong>',
                        template: '你确定要退出应用吗?',
                        okText: '退出',
                        cancelText: '取消'
                    });

                    confirmPopup.then(function (res) {
                        if (res) {
                            ionic.Platform.exitApp();
                        } else {
                        }
                    });
                }

                // Is there a page to go back to?
                if ($location.path() == '/main') {
                    showConfirm();

                } else {
                    // This is the last page: Show confirmation popup
                    showConfirm();
                }

                return false;
            }, 111);
        });

	})

  app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
  	
  	// 预加载模板（就是页面）个数，这个地方设置加载0个，表示一个页面也不预先加载，让路由状态改变时在加载（go）
  	$ionicConfigProvider.templates.maxPrefetch(0);
      //将Android平台的tab放至下层
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('bottom');
      // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
  	
		// AMD结合路由的配置
	$stateProvider
      //  主页面
        .state('noData', angularAMD.route({
            url: '/noData',
            cache:false,
            templateUrl: 'views/noData/noData.html',
            controllerUrl: 'app/noData/noData',
            controller: 'noData'
        }))
      .state('main', angularAMD.route({
        url: '/main',
        templateUrl: 'views/main/index.html',
        controllerUrl: 'app/main/mainControllers',
        controller: 'MainCtl'
      }))
        //数字看板
        .state('test1',angularAMD.route({
            url:'/test1',
            templateUrl:'views/digitalSign/test1.html',
            controllerUrl: 'app/digitalSign/test1',
            controller:'test1Ctrl'
        }))
        .state('waterResource', angularAMD.route({
        url: '/waterResource',
        templateUrl: 'views/digitalSign/resource.html',
        controllerUrl: 'app/digitalSign/resource',
        controller: 'waterResourceCtrl'
      }))
        .state('constructMng', angularAMD.route({
        url: '/constructMng',
        templateUrl: 'views/digitalSign/constructMng.html',
        controllerUrl: 'app/digitalSign/constructMng',
        controller: 'constructMngCtrl'
      }))
        .state('countryWater', angularAMD.route({
        url: '/countryWater',
        templateUrl: 'views/digitalSign/countryWater.html',
        controllerUrl: 'app/digitalSign/countryWater',
        controller: 'countryCtrl'
      }))
        .state('underWater', angularAMD.route({
        url: '/underWater',
        templateUrl: 'views/digitalSign/underWater.html',
        controllerUrl: 'app/digitalSign/underWater',
        controller: 'underWaterCtrl'
      }))
        //雨水情
        .state('rain', angularAMD.route({
        url: '/rain',
        templateUrl: 'views/digitalSign/rain.html',
        controllerUrl: 'app/digitalSign/rain',
        controller: 'rainCtrl'
      }))
        .state('rain.shuiku', angularAMD.route({
        url: '/rain-shuiku',
        cache: false,
        views: {
            'rain-shuiku':{
                templateUrl:'views/digitalSign/rain-shuiku.html',
                controller: 'rShuikuCtrl'
            }
        },
        controllerUrl: 'app/digitalSign/rain-shuiku'

      }))
        .state('rain.hedao', angularAMD.route({
        url: '/rain-hedao',
        cache: false,
        views:{
            'rain-hedao':{
                templateUrl: 'views/digitalSign/rain-hedao.html',
                controller: 'rHedaoCtrl'
                }
            },
        controllerUrl: 'app/digitalSign/rain-hedao'

      }))
      //资源服务
        .state('sourceMng', angularAMD.route({
            url: '/sourceMng',
            templateUrl: 'views/sourceService/sourceMng.html',
            controllerUrl: 'app/sourceService/sourceMng',
            controller: 'sourceMngCtrl'
        }))
        //模型管理
        .state('modelMng', angularAMD.route({
            url: '/modelMng',
            cache:false,
            templateUrl: 'views/sourceService/modelMng.html',
            controllerUrl: 'app/sourceService/modelMng',
            controller: 'modelMngCtrl'
        }))
        //目录管理
        .state('catalogMng', angularAMD.route({
            url: '/catalogMng',
            templateUrl: 'views/sourceService/catalogMng.html',
            controllerUrl: 'app/sourceService/catalogMng',
            controller: 'catalogMngCtrl'
        }))
        //基础信息
        .state('bInfo_index', angularAMD.route({
            url: '/bInfo_index',
            cache:false,
            templateUrl: 'views/basicInfo/bInfo_index.html',
            controllerUrl: 'app/basicInfo/bInfo_index',
            controller: 'bInfoCtrl'
        }))
      // 建管
        .state('bInfo_conMng', angularAMD.route({
            url: '/bInfo_conMng',
            templateUrl: 'views/basicInfo/bInfo_conMng.html',
            controllerUrl: 'app/basicInfo/bInfo_conMng',
            controller: 'bInfo_conMngCtrl'
        }))
        //农村水利
        .state('bInfo_countryWater', angularAMD.route({
            url: '/bInfo_countryWater',
            templateUrl: 'views/basicInfo/bInfo_countryWater.html',
            controllerUrl: 'app/basicInfo/bInfo_countryWater',
            controller: 'bInfo_countryWaterCtrl'
        }))
        //地下水
        .state('bInfo_underWater', angularAMD.route({
            url: '/bInfo_underWater',
            templateUrl: 'views/basicInfo/bInfo_underWater.html',
            controllerUrl: 'app/basicInfo/bInfo_underWater',
            controller: 'bInfo_underWaterCtrl'
        }))

	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/main');

  });

// 调用angular的bootstrap：在后面的define模块应用这个app时，实际上就是angular的对象
  return angularAMD.bootstrap(app);
});
