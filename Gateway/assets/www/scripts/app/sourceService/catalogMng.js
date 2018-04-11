define(['app'],function (app) {
    'use strict';
    app.controller('catalogMngCtrl',function ($scope,$http,$ionicScrollDelegate) {
        //前面一个图
        $http({
            method: "POST",
            url: _HTTP_ADDRESS +'portal_support/appData/mlglData.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function(data){
            console.log(data);

            console.log(data);
            var ndata = [];
            for(var i=41;i<45;i++){
                ndata.push(data[i]);
            }
            console.log(ndata);
            chartFst(dealDataFst(ndata))
        }).error(function (error) {
            console.log(error);
        })
        //后两个图
        $http({
            method: "POST",
            url: _HTTP_ADDRESS +'portal_support/appData/sldxData.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function(data){
            console.log(data);
            var waterObj = []
            console.log(dealData(data).name)
            //水利对象数据 ,在96条数据里截取了1-3条
            for(var i=1;i<4;i++){
                waterObj.push(data[i])
            }

          //  生成饼图

            chartSec(dealData(waterObj))
            //生成柱状图
            catalogBar(dealData(data));
        }).error(function (error) {
            console.log(error);
        })

        /**
         * 处理数据，把  涉水对象(922531) 的类名和数量分隔开
         * 返回一个对象，对象的元素是 数组形式的 类名和数量
         * {
         *      name:["水利对象 ", "涉水对象 ", "IT对象 "],
         *      name_num:["8830403", "922531", "430"]
         * }
         */
        function dealData(dataList){
            var obj = {};
            var name = [];
            var name_num = [];
            for(var i=0;i<dataList.length;i++){
                var ndata = dataList[i].class_name.split('(');
                // console.log(ndata);
                name.push(ndata[0])
                var num = ndata[1].substring(0,ndata[1].length-1)
                // console.log(num);
                name_num.push(parseInt(num));
            }
            obj.name = name;
            obj.name_num = name_num;
            console.log(obj)
            return obj
        }
        function dealDataFst(dataList){
            var obj = {};
            var name = [];
            var name_num = [];
            for(var i=0;i<dataList.length;i++){
                var ndata = dataList[i].node_name.split('(');
                // console.log(ndata);
                name.push(ndata[0])
                var num = ndata[1].substring(0,ndata[1].length-1)
                // console.log(num);
                name_num.push(parseInt(num));
            }
            obj.name = name;
            obj.name_num = name_num;
            return obj
        }
        function chartFst(data){
            console.log('='.repeat(12))
            console.log(data)
            var series = [];
            for(var i=0;i<data.name.length;i++){
                var sObj = [];
                sObj[0] = data.name[i];
                sObj[1]= parseInt(data.name_num[i]);
                series.push(sObj);
            }
            console.log(series);
            $scope.mlzyChartPie = {
                credits: false,
                chart: {
                    type: 'pie',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title: {
                    text: '水利业务数据'
                },
                tooltip: {
                    formatter: function () {
                        return '个数：' + this.point.y + '<br/>比例：' + (this.point.percentage).toFixed(2) + '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,//是否能被选
                        dataLabels: {
                            enabled: true,//每块的名称
                            distance: -5//图例显示在内部
                        },
                        showInLegend: true
                    },
                    series:{
                        cursor:'pointer',
                        events:{
                            click:function(e){
                                console.log(e.point.series.userOptions.data);
                                // chartPie_2();
                                // chartBack();
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '水利对象分布图',
                    data: series
                }]
            };
        }
        //水利目录资源分布饼状图
        $scope.mlzyChartPie = {
            credits: false,
            chart: {
                type: 'pie',
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                }
            },
            title: {
                text: '水利目录资源'
            },
            tooltip: {
                formatter: function () {
                    return '个数：' + this.point.y + '<br/>比例：' + (this.point.percentage).toFixed(2) + '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,//是否能被选
                    dataLabels: {
                        enabled: true,//每块的名称
                        distance: -5//图例显示在内部
                    },
                    showInLegend: true
                },
                series:{
                    cursor:'pointer',
                    events:{
                        click:function(e){
                            console.log(e.point.series.userOptions.data);
                            // chartPie_2();
                            // chartBack();
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '水利业务数据',
                data: []
            }]
        };
        //生成水利对象饼状图
        function chartSec(data){
            console.log('='.repeat(12))
            console.log(data)
            var series = [];
            for(var i=0;i<data.name.length;i++){
                var sObj = [];
                sObj[0] = data.name[i];
                sObj[1]= parseInt(data.name_num[i]);
                series.push(sObj);
            }
            console.log(series);
            $scope.objChartPie = {
                credits: false,
                chart: {
                    type: 'pie',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title: {
                    text: '水利对象分布图'
                },
                tooltip: {
                    formatter: function () {
                        return '个数：' + this.point.y + '<br/>比例：' + (this.point.percentage).toFixed(2) + '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,//是否能被选
                        dataLabels: {
                            enabled: true,//每块的名称
                            distance: -5//图例显示在内部
                        },
                        showInLegend: true
                    },
                    series:{
                        cursor:'pointer',
                        events:{
                            click:function(e){
                                console.log(e.point.series.userOptions.data);
                                // chartPie_2();
                                // chartBack();
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '水利对象分布图',
                    data: series
                }]
            };
        }
        //初始化objChartPie
        $scope.objChartPie = {
            credits: false,
            chart: {
                type: 'pie',
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                }
            },
            title: {
                text: '水利对象分布图'
            },
            tooltip: {
                formatter: function () {
                    return '个数：' + this.point.y + '<br/>比例：' + (this.point.y * 100).toFixed(2) + '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,//是否能被选
                    // cursor:'pointer',
                    dataLabels: {
                        enabled: true,//每块的名称
                        distance: -5//图例显示在内部
                    },
                    showInLegend: true
                },
                series:{
                    events:{
                        click:function(e){
                            console.log(e.point.series.userOptions.data);
                            chartPie_2();
                            chartBack();
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '水利对象分布图',
                data: [
                    // {
                    //     name:'person',
                    //     y:3
                    // },{
                    //     name:'animals',
                    //     y:5
                    // }

                ]
            }]
        };
        //水利对象下钻1层
        function chartPie_2(){
            console.log('生成chart')
            $scope.objChartPie = {
                credits: false,
                chart: {
                    type: 'pie',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title: {
                    text: '水利对象分布图'
                },
                tooltip: {
                    formatter: function () {
                        return '个数：' + this.point.y + '<br/>比例：' + (this.point.y * 100).toFixed(2) + '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,//是否能被选
                        // cursor:'pointer',
                        dataLabels: {
                            enabled: true,//每块的名称
                            distance: -5//图例显示在内部
                        },
                        showInLegend: true
                    },
                    series:{
                        cursor:'pointer',
                        events:{
                            click:function(e){
                                console.log(e.point.series.userOptions.data);
                                chartPie_3()
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '水利对象分布图',
                    data: [
                        {
                            name:'teacher',
                            y:3
                        },{
                            name:'student',
                            y:10
                        },{
                            name:'lawyer',
                            y:4
                        }
                    ]
                }]
            };
            chartBack()
            $scope.$apply();
        }
        // 水利对象下钻2层
        function chartPie_3(){
            console.log('生成chart3')
            $scope.objChartPie = {
                credits: false,
                chart: {
                    type: 'pie',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title: {
                    text: '年龄'
                },
                tooltip: {
                    formatter: function () {
                        return '个数：' + this.point.y + '<br/>比例：' + (this.point.y * 100).toFixed(2) + '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,//是否能被选
                        dataLabels: {
                            enabled: true,//每块的名称
                            distance: -5//图例显示在内部
                        },
                        showInLegend: true
                    },
                    series:{
                        events:{
                            click:function(e){
                                console.log(e.point.series.userOptions.data);
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '年龄',
                    data: [
                        {
                            name:'<30',
                            y:3
                        },{
                            name:'<40',
                            y:56
                        },{
                            name:'<55',
                            y:32
                        }
                    ]
                }]
            };
            chartBack()
            $scope.$apply();
        }
        //观察饼状图的变化，没什么作用
        $scope.$watch('$scope.catalogChartPie', function(nv) {
            $scope.isDoneAll = nv ? '没改变' : '改变了';
            console.log($scope.isDoneAll);
        });
        //返回按钮
        // function chartBack(){
        //     console.log(1234)
        //   var btn = document.createElement('button');
        //     btn.innerHTML = '返回上一级';
        //     btn.style = {
        //         'position':'absolute',
        //         'top':50+'px',
        //         'left':100+'px',
        //         'display':'inline-block',
        //         'width':60+'px',
        //         'height':30+'px',
        //         'background':'#eee',
        //         'z-index':999
        //     }
        //     // document.querySelector('#pie').appendChild(btn)
        //     console.log(btn);
        // }
        //生成水利对象柱状图
        function catalogBar(data){
            console.log('柱状图'+'='.repeat(20));
            console.log(data);
            $scope.catalogChartBar = {
                credits:false,
                chart:{
                    type:'column',
                    panning: true,
                    zoomType: 'x',
                    pinchType: 'x',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    }
                },
                title:{
                    text:'水利部对象柱状图'
                },
                plotOptions:{

                },
                tooltip:{
                    pointFormat:'数量：{point.y}个',
                    followTouchMove: true
                },
                legend:{
                    enabled:false
                },
                xAxis:{
                    title:{
                        title:{enabled:false}
                    },
                    categories:data.name,
                    // tickPixelInterval:500
                },
                yAxis:{
                    title:{
                        // enabled:false
                        text:'M(百万)'
                    },
                },
                series:[{
                    data:data.name_num
                }]
            };
        }
        //初始化 假数据
        $scope.catalogChartBar = {
            credits:false,
            chart:{
              type:'bar',
                panning: true,
                zoomType: 'x',
                pinchType: 'x',

              backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
              }
            },
            title:{
              text:'水利部对象柱状图'
            },
            plotOptions:{

            },
            tooltip:{
                pointFormat:'数量：{point.y}个',
                followTouchMove: true
            },
            legend:{
              enabled:false
            },
            xAxis:{
              title:{
                  title:{enabled:false}
              },
              categories:[]
            },
            yAxis:{
              title:{enabled:false}
            },
            series:[{
              data:[]
            }]
        };
        $scope.chartH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48-800;
        //重置resetZoom按钮
        (function resetZoom(){
            Highcharts.setOptions({
                        lang: {
                        resetZoom: "返回",
                        resetZoomTitle: "回到初始状态"
                    }
                });
        })()
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
                    // console.log('往下滑动');
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
        document.querySelector('body').ontouchend = function(){
            // console.log('拖动了');

        }

    })
})