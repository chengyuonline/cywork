define(['app'], function(app) {
    'use strict';
    app.controller('test1Ctrl',function($scope,$state,$http){
        $scope.goBack = function(){
            $state.go('main')
        }
        $scope.params = {
            name:'',
            phone:'',
            email:''
        }
        
        $scope.onSubmit = function(){
            console.log($scope.params.name);
            console.log($scope.params.phone);
            console.log($scope.params.email);
            $http({
                method:"get",
                url: '/api/test1?name=' + $scope.params.name + '&phone=' + $scope.params.phone + '&email=' + $scope.params.email,
            
            }).success(function(data) {
                console.log(data);
            })
        }
    })
});