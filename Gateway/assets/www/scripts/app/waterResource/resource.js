
define(['app'], function(app) {
    'use strict';
    app.controller('waterResourceCtrl',function($scope, $state,$ionicScrollDelegate){
        console.log(111);

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
                    format:'{value}M',
                    step: 1
                },
                tickPixelInterval:100,
                max:30
            },
            series:[{
                name:'许可水量',
                data:[14,10,7]
            },{
                name:'监测许可水量',
                data:[20,16,10]
            },{
                name:'实际监测水量',
                color:'rgb(255, 153, 137)',
                data:[24,12,8]
            }]
        };
        //取用用途情况
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
                        return this.value / 1000000 + 'M';
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
                data:[2722795.177,2934216.73,2400692.882,868456.739]
            }]
        };
    })
});
