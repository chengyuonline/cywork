
define(['app'], function(app) {
    'use strict';
    app.controller('waterResourceCtrl', function ($scope, $window, $http, $state, $ionicScrollDelegate) {

        //请求有效许可证书
        function queryAvali(year) {
            $http({
                method: "POST",
                url: _HTTP_ADDRESS +'portal_support/appData/qsxkData.do?year='+year,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                }
            }).success(function (data) {
                // console.log(data);
                avaliCrd(data);
            }).error(function (error) {
                console.log(error);
            });
        }

        //请求取用水情况数据
        function queryQushui(year) {
            $http({
                method: "POST",
                url: _HTTP_ADDRESS +'portal_support/appData/qysqkData.do?year='+year,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                }
            }).success(function (data) {
                // console.log(data);
                var categories = [],
                    xk_data = [],
                    jc_data = [],
                    sj_data = [];
                for(var i=0;i<data.length;i++){
                    categories.push(data[i].STYPE);
                    xk_data.push(parseFloat(data[i].ZL));
                    jc_data.push(parseFloat(data[i].DBS));
                    sj_data.push(parseFloat(data[i].DXS));
                }
                licensedWater(xk_data);
                qushuiChart(xk_data,jc_data,sj_data);
            }).error(function (error) {
                console.log(error);
            });
        }

        //请求取用水用途
        function queryQushuiYt(year) {
            $http({
                method: "POST",
                url: _HTTP_ADDRESS +'portal_support/appData/qyytqkData.do?year='+year,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*'
                }
            }).success(function(data){
                console.log(data);
                var xk_data = [],
                    jc_data = [],
                    sj_data = [];

                    xk_data.push(parseFloat(data[0].GY),parseFloat(data[0].NY),parseFloat(data[0].SH),parseFloat(data[0].QT));
                    jc_data.push(parseFloat(data[1].GY),parseFloat(data[1].NY),parseFloat(data[1].SH),parseFloat(data[1].QT));
                    sj_data.push(parseFloat(data[2].GY),parseFloat(data[2].NY),parseFloat(data[2].SH),parseFloat(data[2].QT));

                console.log(xk_data);
                qushuiYtChart(xk_data,jc_data,sj_data);
            }).error(function (error) {
                console.log(error);
            });
        }

        //search
        $scope.filterSearch = function () {
            console.log($scope.params.year);
            queryAvali($scope.params.year.year);
            queryQushui($scope.params.year.year);
            queryQushuiYt($scope.params.year.year);
        }

        //生成有效许可证书项
        function avaliCrd(crd) {
            $scope.crd = crd[0];
            // console.log($scope.crd);
        }
        //
        function licensedWater(data){
            for(var i in data){
                // console.log(typeof data[i]);
                if(isNaN(data[i])){
                    data[i] = 0;
                }
            }
            $scope.licenseItem = data;
        }
        //下拉框数据量
        $scope.yearOption = [
            {year: 2017},
            {year: 2016},
            {year: 2015},
            {year: 2014},
            {year: 2013},
            {year: 2012}
        ];
        //初始化model（对象形式）
        $scope.params = {
            year: ""
        };

        //监听事件,这里只是监听数据变化，没什么作用
        $scope.$watch('params.year', function (newValue) {
            console.log(newValue.year);
            // selectYear(newValue.year);
        }, false);

        //生成取用水情况图
        function qushuiChart(xk_data,jc_data,sj_data) {
            $scope.qushuiChart = {
                credits: {
                    enabled: false
                },
                chart: {
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    },
                    type: 'column'
                },

                plotOptions: {},
                title: {
                    text: '取用水情况'
                },
                xAxis: {
                    categories: ['总量','地表水','地下水']
                },
                yAxis: {
                    title: {
                        text: '万m³',
                        align: 'high',
                        rotation: 0,
                        offset: -20,
                        y: -10
                    },
                    labels: {
                        // format: '{value}M',
                        step: 1
                    },
                    tickPixelInterval: 100
                    // max: 30
                },
                series: [{
                    name: '许可水量',
                    data:xk_data
                }, {
                    name: '监测许可水量',
                    data: jc_data
                }, {
                    name: '实际监测水量',
                    color: 'rgb(255, 153, 137)',
                    data: sj_data
                }]
            };
        }
        //生成取水用途情况图
        function qushuiYtChart(xk_data,jc_data,sj_data){
            $scope.qushuiYtChart = {
                credits: {
                    enabled:false
                },
                chart:{
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    },
                    type:'column'

                },
                title:{
                    text:'取水用途情况'
                },
                xAxis:{
                    categories:['工业','农业','生活用水','其他']
                },
                yAxis:{
                    title:{
                        text:'万m³',
                        align:'high',
                        rotation:0,
                        offset:-20,
                        y:-10
                    },
                    labels:{
                        formatter: function(){
                            return this.value/10000000 + 'M';
                        },
                        step: 1
                    },
                },
                series:[{
                    name:'许可水量',
                    data:xk_data
                },{
                    name:'监测许可水量',
                    data:jc_data
                },{
                    name:'实际监测水量',
                    color:'rgb(255, 153, 137)',
                    data:sj_data
                }]
            };
        }
        //取用水情况
        $scope.qushuiChart = {
            credits: {
                enabled:false
            },
            chart:{
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                },
                type:'column'
            },

            plotOptions:{

            },
            title:{
                text:'取用水情况'
            },
            xAxis:{
                categories:['总量','地表水','地下水']
            },
            yAxis:{
                title:{
                    text:'万m³',
                    align:'high',
                    rotation:0,
                    offset:-20,
                    y:-10
                },
                labels:{
                    formatter: function(){
                        return this.value / 10000000 + 'M';
                    },
                    step: 1
                },
                tickPixelInterval:100,
            },
            series:[{
                name:'许可水量',
                data:[]
            },{
                name:'监测许可水量',
                data:[]
            },{
                name:'实际监测水量',
                color:'rgb(255, 153, 137)',
                data:[]
            }]
        };
        //取用水用途情况
        $scope.qushuiYtChart = {
            credits: {
                enabled:false
            },
            chart:{
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                },
                type:'column'

            },
            title:{
                text:'取水用途情况'
            },
            xAxis:{
                categories:['工业','农业','生活用水','其他']
            },
            yAxis:{
                title:{
                    text:'万m³',
                    align:'high',
                    rotation:0,
                    offset:-20,
                    y:-10
                },
                labels:{
                    formatter: function(){
                        return this.value/10000000 + 'M';
                    },
                    step: 1
                },
            },
            series:[{
                name:'许可水量',
                data:[]
            },{
                name:'监测许可水量',
                data:[]
            },{
                name:'实际监测水量',
                color:'rgb(255, 153, 137)',
                data:[]
            }]
        };
        //button
        // $scope.buttonText = '点击下滑';
        // $scope.nextChart = function () {
        //     $scope.buttonCode = !$scope.buttonCode;
        //     if($scope.buttonCode){
        //         $scope.buttonText = '点击上滑'
        //         $ionicScrollDelegate.$getByHandle('mainContent').scrollBottom([true]);
        //     }else{
        //         $scope.buttonText = '点击下滑';
        //         $ionicScrollDelegate.$getByHandle('mainContent').scrollTop([true]);
        //     }
        // };

        // 处理滑动
        var startX,startY,moveEndX,moveEndY,distanceX,distanceY;
        document.querySelector('body').ontouchstart= function(e){
            // console.log(e);
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
        }
        document.querySelector('body').ontouchmove = function(e){
            moveEndX = e.changedTouches[0].pageX;
            moveEndY = e.changedTouches[0].pageY;
            distanceX = moveEndX-startX;
            distanceY = moveEndY-startY;
            // console.log(distanceX);
            // console.log(distanceY);
            function direction(distanceX,distanceY){
                if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
                    // console.log('往右滑动');
                    return 'right'
                }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
                    // console.log('往左滑动');
                    return 'left'
                }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY<0){
                    // console.log('往上滑动');
                    return 'up'
                }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY>0){
                    // g('往下滑动');
                    return 'down'
                }else{
                    return false;
                }
            }
            if(direction(distanceX,distanceY)=='up'){
                $ionicScrollDelegate.$getByHandle('mainContent').scrollBy(0,-distanceY,[true]);
            }
            if(direction(distanceX,distanceY)=='down'){
                $ionicScrollDelegate.$getByHandle('mainContent').scrollBy(0,-distanceY,[true]);
            }
        }
    })
});
