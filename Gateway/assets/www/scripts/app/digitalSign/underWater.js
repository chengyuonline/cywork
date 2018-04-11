define(['app'],function(app){
    'use strict';
    app.controller('underWaterCtrl',function($scope,$state,$http,$filter){
        console.log(111);
        $http({
            method:'POST',
            url:_HTTP_ADDRESS +'portal_support/appData/digitalData.do',
            header:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function(data){
            console.log(data);
            var timeObj= {};
            timeObj.categories = [],
            timeObj.timePre = [],
            timeObj.timeNext = [];
            timeObj.date = new Date(new Date()-24*60*60*1000*30);
            timeObj.date2 = new Date(new Date()-24*60*60*1000*30*2);

            timeObj.formatDate = $filter('date')(timeObj.date, 'yyyy-MM');
            timeObj.formatDate2 = $filter('date')(timeObj.date2, 'yyyy-MM');
            // console.log( timeObj.formatDate);
            for(var i=0;i<data.list.length;i++){
                timeObj.categories.push(data.list[i].chfcad);
                timeObj.timePre.push(parseFloat(data.list[i][timeObj.formatDate2]));
                timeObj.timeNext.push(parseFloat(data.list[i][timeObj.formatDate]));
            }
            // console.log(timeObj.timePre);
            chartConfig(timeObj);
        })
        function chartConfig(timeObj){
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
                    text:timeObj.formatDate2+'到'+timeObj.formatDate+'统计图',
                    style:{
                        fontSize:15
                    }
                },
                tooltip:{
                    followTouchMove:false
                },
                xAxis:{
                    categories:timeObj.categories,
                    max:4,
                    labels:{
                        enabled:true,
                    }
                },
                yAxis:{
                    title:{
                        text:'m',
                        align:'high',
                        rotation:0,
                        offset:-20,
                        y:-10
                    },
                    min:0,
                    allowDecimals: false,//不允许为小数
                    tickPixelInterval:30,
                    // tickInterval:1,//间隔数值为1
                },
                series:[{
                    name:timeObj.formatDate2+'平均埋深',
                    data: timeObj.timePre
                },{
                    name:timeObj.formatDate+'平均埋深',
                    data:timeObj.timeNext
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
                text:'2017-06到2017-07统计图',
                style:{
                    fontSize:15
                }
            },
            tooltip:{
            },
            xAxis:{
                categories:[],
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
                    text:'m',
                    align:'high',
                    rotation:0,
                    offset:-20,
                    y:-10
                },
                min:0,
                allowDecimals: false,//不允许为小数
                // minTickInterval:1,
                tickPixelInterval:30,
                // tickInterval:1,//间隔数值为1


            },
            series:[{
                name:'2017-06平均埋深',
                data: []
            },{
                name:'2017-07平均埋深',
                data:[]
            }]
        };
        $scope.chartH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48;





    })

})