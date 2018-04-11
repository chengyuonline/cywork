define(['app'],function (app) {
    'use strict';
    app.controller('noData',function ($scope,$ionicHistory,$state,$ionicPopup) {
        $scope.goBack = function(){
            $state.go('main')
        }
        var alertPopup = $ionicPopup.alert({
            title: '',
            template: '暂无数据'
        });
        alertPopup.then(function(res) {
            console.log(res);
            $state.go('main')
        });
    })
})