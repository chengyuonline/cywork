define(['app'],function (app) {
    'use strict';
    app.controller('modelMngCtrl', function ($scope,$http,$ionicScrollDelegate) {
        var url = _HTTP_ADDRESS +'portal_support/appData/mxglData.do';
            console.log(url);
        $http({
            method: "POST",
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function(data){
            // console.log(data);
            chartPie(data);
            chartBar(data);
        })
        function chartPie(data){
            var add = 0,
                OBJ = [],
                ATT = [],
                REL = [],
                SHR = [],
                OTHER = [],
                categories = [];
            data.data.forEach(function(item,key){
                console.log(item);
                add+=item.data;
                // console.log(add);
                if(key==0){
                    OBJ.push(item.name,item.data);
                }else if(key==1){
                    ATT.push(item.name,item.data);
                }else if(key==2){
                    REL.push(item.name,item.data);
                }else if(key==3){
                    SHR.push(item.name,item.data);
                }else if(key==4){
                    OTHER.push(item.name,item.data);
                }
            })
            categories.push(OBJ,ATT,REL,SHR,OTHER);
            console.log(categories);
            $scope.modelChartPie = {
                credits:false,
                chart:{
                    type:'pie',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title:{
                    text:'模型对象统计图'
                },
                tooltip:{
                    formatter:function(){
                        // console.log(add);
                        return '个数：'+this.point.y+'<br/>比例：'+(this.point.y/add*100).toFixed(2)+'%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect:true,//是否能被选
                        // cursor:'pointer',
                        dataLabels: {
                            enabled:true,//每块的名称
                            distance:-5//图例显示在内部
                        },
                        showInLegend:true
                    }
                },
                series:[{
                    type:'pie',
                    name:'模型对象统计图',
                    data:categories
                }]
            };
        }
        $scope.modelChartPie = {
            credits:false,
            chart:{
                type:'pie',
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                }
            },
            title:{
                text:'模型对象统计图'
            },
            tooltip:{

            },
            plotOptions: {
                pie: {
                    allowPointSelect:true,//是否能被选
                    cursor:'pointer',
                    dataLabels: {
                        enabled:true,//每块的名称
                        distance:-50//图例显示在内部
                    },
                    showInLegend:true
                }
            },
            series:[{
                type:'pie',
                data:[
                    // ['对象名录表',14.3],
                    // ['对象基础信息表',14.3],
                    // ['关系表',70.6],
                    // ['其他',0.8]

                ]
            }]
        };
        function chartBar(data){
            var nameCategories = [],
                series = [];
            data.data.forEach(function(item){
                console.log(item);
                nameCategories.push(item.name);
                series.push(item.data);
            })
            $scope.modelChartBar = {
                credits:false,
                chart:{
                    type:'bar',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title:{
                    text:'模型对象数量统计'
                },
                tooltip:{
                    pointFormat:'数量：{point.y}个'
                },
                plotOptions:{

                },
                legend:{
                    enabled:false
                },
                xAxis:{
                    title:{
                        text: '模型对象类型',
                        align:'high',
                        rotation:360,
                        offset:-20
                    },
                    categories:nameCategories,
                    labels: {
                        style: {
                            fontSize: '10'
                        }
                    }
                },
                yAxis:{
                    title:{
                        text:'数量(个)',
                        x:100
                    }
                },
                series:[{
                    data:series
                }]
            };
        }

        $scope.modelChartBar = {
            credits:false,
            chart:{
                type:'bar',
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                }
            },
            title:{
                text:'模型对象数量统计'
            },
            tooltip:{
                pointFormat:'数量：{point.y}个'
            },
            plotOptions:{

            },
            legend:{
                enabled:false
            },
            xAxis:{
                title:{
                   text: '模型对象类型',
                    align:'high',
                    rotation:360,
                    offset:-20
                },
                categories:[],
                labels: {
                    style: {
                        fontSize: '10'
                    }
                }
            },
            yAxis:{
                title:{
                    text:'数量(个)'
                }
            },
            series:[{
                    data:[]
                }]
        };

        //button
        // $scope.buttonText = '点击下滑';
        // $scope.nextChart = function () {
        //     $scope.buttonCode = !$scope.buttonCode;
        //     if ($scope.buttonCode) {
        //         $scope.buttonText = '点击上滑'
        //         $ionicScrollDelegate.$getByHandle('mainContent').scrollBottom([true]);
        //     } else {
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
})