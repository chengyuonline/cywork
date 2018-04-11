define(['app'], function (app) {
    'use strict';
    app.controller('bInfo_countryWaterCtrl',function ($scope,$ionicScrollDelegate) {
        $scope.river=[
            {location:'哈尔滨',river:'松花江',deep:'116.03',warningDeep:'118.1',flow:	'1200',time:'2017-08-30 08',province:'黑—哈尔滨市道里区河干街'},
            {location:'扶余',river:'第二松花江',deep:'130.88',warningDeep:'133.56',flow:'400',time:'2017-08-30 08',province:'吉-扶余'},
            {location:'大赉',river:'嫩江',deep:'125.48',warningDeep:'131.9',flow:'350',time:'2017-08-30 08',	province:'吉-大安'},
            {location:'铁岭',river:'辽河',deep:'52.32',warningDeep:'59.59',flow:'100',time:'2017-08-30 08',province:'辽-铁岭'},
            {location:'兰州',river:'黄河',deep:'1511.86',warningDeep:'676',flow:'2017',time:'08time-30 08',province:'甘-兰州'},
            {location:'花园口',river:'黄河',deep:	'89.06',warningDeep:'93.85',flow:'390',time:'2017-08-30 08',province:'豫-郑州市花园口乡花园口村'},
            {location:'泺口',river:'黄河',deep:'25.89',warningDeep:'31.4',flow:'310',time:'2017-08-30 08',province:'鲁-济南'},
            {location:'利津',river:'黄河',deep:'10.27',warningDeep:'14.24',flow:'228',time:'2017-08-30 08',province:'鲁-利津'},
            {location:'华县',river:'渭河',deep:'335.49',warningDeep:'341.3',flow:'196',time:'2017-08-30 08',province:'陕西省华县下庙镇'},
            {location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},{location:'息县',river:'淮河',deep:'30.58',warningDeep:'41.5',flow:'65',time:'2017-08-30 08',province:'豫-息县'},
            {location:'王家坝',river:'淮河',deep:	'22.61',warningDeep:'27.5',flow:'320',time:'2017-08-30 08',province:'皖-阜南'}
        ];
        //控制滚动
        $scope.h=Math.min(document.documentElement.clientHeight,window.innerHeight)-44-40-47;
        $scope.scrollRightHorizon=function(){
            var rightHandle = $ionicScrollDelegate.$getByHandle("rightContainerHandle");
            var headHandle = $ionicScrollDelegate.$getByHandle("headContainerHandle");
            // console.log(rightHandle.getScrollPosition());
            headHandle.scrollTo(rightHandle.getScrollPosition().left,0,false);
        };
        $scope.noScroll=function(){
            var headHandle = $ionicScrollDelegate.$getByHandle("headContainerHandle");
            headHandle.freezeScroll(true);
        };
    })
});