/**
 * @author  胡冲冲
 *  配置require的配置路径（ionic：集成angular）
 *  baseUrl：如名字一样 基本的路径 这里我们采用js文件夹为我们的存放js文件的基本路径
 *  paths：  定义组件，即我们引用的js文件路径
 *  shim：   组件的依赖关系
 *  deps：   设置项目主文件 app.js
 */
require.config({
    //baseUrl如名字一样 基本的路径
    baseUrl: "scripts",
    paths: {
        'ionic': 'lib/ionic/js/ionic.min',
        'ionicAngular': 'lib/ionic/js/ionic-angular.min',
        'angular':'lib/ionic/js/angular/angular.min',
        'agAnimate':'lib/ionic/js/angular/angular-animate.min',
        'agSanitize':'lib/ionic/js/angular/angular-sanitize.min',
        'uiRouter':'lib/ionic/js/angular/angular-ui-router.min',
        'agResource': 'lib/ionic/js/angular/angular-resource',
        'angularAMD': 'lib/angularAMD/angularAMD',
        'ngload': 'lib/angularAMD/ngload',
        'highcharts': 'lib/highcharts/highstock',
        'chart-ng': 'lib/highcharts/highcharts-ng',
        'ion-floating-menu': 'lib/ion-floating-menu/ion-floating-menu',
        'ion-datetime-picker': 'lib/ion-datetime-picker/release/ion-datetime-picker.min',
        'ng-mfb':'lib/ng-material-floating-button/mfb-directive'
    },
    shim: {
    	'angular' : {exports : 'angular'}, 
    	'agAnimate':['angular'],
    	'agSanitize':['angular'],
    	'uiRouter':['angular'],
    	'agResource':['angular'],
    	'ionic':['angular'],
    	'ionicAngular':['angular', 'ionic', 'uiRouter', 'agAnimate', 'agSanitize','agResource'],
        'angularAMD': ['angular','ionic'],
        'ngload': ['angularAMD'],
        'chart-ng': ['ionic', 'highcharts'],
        'ion-floating-menu': ['ionic'],
        'ion-datetime-picker': ['ionic'],
        'ng-mfb':['ionic']
    },
    priority:['angular','ionic'], 
    deps: ['app']
});