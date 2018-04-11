define(['app'], function(app) {
    'use strict';
    app.controller('constructMngCtrl',function($scope, $state,$http){
        $scope.goBack = function(){
            $state.go('main');
        };
        $http({
            method: "POST",
            url: 'http://10.1.7.158:8095/bjjgpt/appuser/echartTj.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function (data) {
            console.log(data);
            //data里面的数据有categories（30多个省的名称）,四个阶段的数据（每个阶段中的数据量和省对应）
            var categories = [],
                study_stage = [],
                design_stage = [],
                con_stage = [],
                completed = [];
            for(var i=0;i<data.length;i++) {
                categories.push(data[i].adnm);
                study_stage.push(parseFloat(data[i].study_stage));
                design_stage.push(parseFloat(data[i].design_stage));
                con_stage.push(parseFloat(data[i].con_stage));
                completed.push(parseFloat(data[i].completed));
            }
            // console.log(con_stage);
            chartConfig(categories,study_stage,design_stage,con_stage,completed)
        }).error(function (err) {
            console.log(err);
        });

        function chartConfig (categories,study_stage,design_stage,con_stage,completed) {
            $scope.chartConfig = {
                credits: {
                    enabled:false
                },
                chart:{
                    panning: true,
                    zoomType: '1',
                    pinchType: null,
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    },
                    type: 'column',
                    marginTop: 60
                },

                title:{
                    text:'2017年8月全国在建重大水利工程阶段统计图',
                    style:{
                        fontSize: 15,
                    },

                },
                tooltip:{
                    followTouchMove:false
                },
                xAxis:{
                    categories:categories,
                    min:0,
                    max:4,
                    tickPixelInterval: 1,
                    labels:{
                        enabled:true
                        // rotation:270
                    }
                    // tickPixelInterval:200
                    // minTickPixelInterval:20
                },
                yAxis:{
                    title:{
                        text:'工程阶段（个）',
                        align:'high',
                        rotation:0,
                        offset:-30,
                        y:-10
                    },
                    min:0,
                    max:4,
                    allowDecimals: false,//不允许为小数
                    minTickInterval:1,
                    tickInterval:1//间隔数值为1
                },
                series:[{
                    name:'可研阶段',
                    data:study_stage
                },{
                    name:'初步设计阶段',
                    data:design_stage
                },{
                    name:'施工阶段',
                    color:'rgb(255, 153, 137)',
                    data:con_stage
                },{
                    name:'已完工',
                    color:'red',
                    data:completed
                }]
            }

        }
        $scope.chartConfig = {
            credits: {
                enabled:false
            },
            chart:{
                panning: true,
                zoomType: '1',
                pinchType: null,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                },
                type: 'column',
                marginTop: 60
            },

            title:{
                text:'2017年8月全国在建重大水利工程阶段统计图',
                style:{
                    fontSize: 15,
                },

            },
            tooltip:{
              followTouchMove:false
            },
            xAxis:{
                categories:['北京','浙江','天津','安徽','上海','福建','重庆','江西', '山东','河南','内蒙古','湖北','新疆', '湖南', '宁夏', '广东','西藏','海南','广西','四川','河北','贵州','山西','云南','辽宁','陕西','吉林','甘肃', '黑龙江','青海','江苏'],
                min:0,
                max:4,
                tickPixelInterval: 1,
                labels:{
                    enabled:true
                    // rotation:270
                }
                // tickPixelInterval:200
                // minTickPixelInterval:20
            },
            yAxis:{
                title:{
                    text:'工程阶段（个）',
                    align:'high',
                    rotation:0,
                    offset:-30,
                    y:-10
                },
                allowDecimals: false,//不允许为小数
                minTickInterval:1,
                tickInterval:1,//间隔数值为1

            },
            series:[{
                name:'可研阶段',
                data:[1,2,3,1,1,4,3,3,1,1,1,2,2,3,1,1,1,1,3,3,4,4,2,2,3,0,0,0]
            },{
                name:'初步设计阶段',
                data:[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0]
            },{
                name:'施工阶段',
                color:'rgb(255, 153, 137)',
                data:[0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4]
            },{
                name:'已完工',
                color:'red',
                data:[0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,2,2,2,2,2,0,0,0,0,0,0]
            }]
        };
        $scope.chartH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48;




    })

})