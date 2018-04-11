define(['app'], function (app) {
    'use strict';
    app.controller('bInfo_conMngCtrl',function ($scope) {
        $scope.scrollH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48;
    })
});