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
                    type: 'spline',
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
            chart:{
                zoomType:"x",
                type:'spline',
                panning:true
            },
            yAxis: {
                title: {
                    // align:'high',
                    // rotation:0,
                    text: '',
                },
                minTickInterval:.1,
                tickInterval:.1,//间隔数值为1
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            xAxis: {
                type:'datetime',
                title: {
                    text: '水位'
                },
                categories:["01日09时", "01日10时", "01日11时", "01日12时", "01日13时", "01日14时", "01日15时",
                    "01日16时", "01日17时", "01日18时", "01日19时", "01日20时", "01日21时", "01日22时", "01日23时", "02日00时",
                    "02日01时", "02日02时", "02日03时", "02日04时", "02日05时", "02日06时", "02日07时", "02日08时", "02日09时",
                    "02日10时", "02日11时", "02日12时", "02日13时", "02日14时", "02日15时", "02日16时", "02日17时", "02日18时",
                    "02日19时", "02日20时", "02日21时", "02日22时", "02日23时", "03日00时", "03日01时",
                    "03日02时", "03日03时", "03日04时", "03日05时", "03日06时", "03日07时", "03日08时"]
            },
            title: {
                text: '水位'
            },
            plotOption:{
                spline: {
                    // 取消鼠标跟随 配置在  line 里，对直线图有效
                    enableMouseTracking: false
                },
            },
            legend:{
                enabled:false
            },
            loading: false,
            size: {},
            series: [{
                name:'水位',
                type:'spline',
                // dataLabels:{enabled:false},
                data:[18, 22, 17, 22, 20, 14, 9, 15, 15, 21, 15, 12, 13, 10, 12, 14, 7, 9, 9, 5, 10,
                    15, 17, 11, 26, 18, 16, 21, 20, 12, 19, 16, 15, 12, 11, 14, 18, 12, 17, 11, 13,
                    16, 15, 9, 15, 13, 11, 12]
            }]
        };
        $scope.chartH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48;




    })

})