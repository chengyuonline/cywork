define(['app'],function(app){
    'use strict';
    app.controller('countryCtrl',function($scope,$state,$http){
        $http({
            methods:'POST',
            url:_HTTP_ADDRESS +'portal_support/appData/ncslData.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function(data){
            console.log(data);

            var rw_area = [],
                sj_complete = [],
                province = data[2];
               data[0].forEach(function (area) {
                   rw_area.push(parseFloat(area))
               });
                data[1].forEach(function (comp) {
                    sj_complete.push(parseFloat(comp))
                });
            chartConfig(rw_area,sj_complete,province);
        }).error(function(error){
            console.log(error);
        })

        function chartConfig(rw_area,sj_complete,province){
            $scope.chartConfig = {
                credits: {
                    enabled:false
                },
                chart:{
                    panning: true,//平移
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
                    text:'2016年高效节水灌溉面积统计图',
                    style:{
                        fontSize:15
                    }
                },
                tooltip:{
                    followTouchMove:false
                },
                xAxis:{
                    categories: province,
                    min:0,
                    max:4,
                    labels:{
                        enabled:true,
                        // rotation:90
                    },
                    // maxPadding:30,
                    // startOnTick:true,
                    // endOnTick:true
                    // tickPixelInterval:200
                    // minTickPixelInterval:20
                },
                yAxis:{

                    title:{
                        text:'(万亩)',
                        align:'high',
                        rotation:0,
                        offset:-30,
                        y:-10
                    },
                    min:0,

                    allowDecimals: false,//不允许为小数
                    minTickInterval:1,
                    tickPixelInterval:30,
                    // tickInterval:1,//间隔数值为1
                    // tickPosition:[0,50,100,150,200,250,300,350]

                },
                series:[{
                    name:'任务面积(万亩)',
                    data: rw_area
                },{
                    name:'实际完成(万亩)',
                    data: sj_complete
                }]
            };
        }
        $scope.chartConfig = {
            credits: {
                enabled:false
            },
            chart:{
                panning: true,//平移
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
                text:'2016年高效节水灌溉面积统计图',
                style:{
                    fontSize:15
                }
            },
            tooltip:{
                followTouchMove:false
            },
            xAxis:{
                categories:[],
                min:0,
                max:4,
                labels:{
                    enabled:true,
                    // rotation:90
                }
                // tickPixelInterval:200
                // minTickPixelInterval:20
            },
            yAxis:{

                title:{
                    text:'',
                    align:'high',
                    rotation:0,
                    offset:-30,
                    y:-10
                },
                min:0,

                allowDecimals: false,//不允许为小数
                // minTickInterval:1,
                tickPixelInterval:30,
                // tickInterval:1,//间隔数值为1
                // tickPosition:[0,50,100,150,200,250,300,350]

            },
            series:[{
                name:'任务面积(万亩)',
                data:[]
            },{
                name:'实际完成(万亩)',
                data:[]
            }]
        };
        $scope.chartH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48;




    })

})