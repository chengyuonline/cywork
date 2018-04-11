define(['app'],function (app) {
    'use strict';
    app.controller('sourceMngCtrl',function ($scope,$http,$ionicScrollDelegate) {
        //应用资源
        var appTitle = '应用资源';
        //数据资源
        var dataTitle = '数据资源';
        //硬件资源
        var hardTitle = '硬件资源';
        //服务资源
        var srvTitle = '服务资源';

        $http({
            method: "POST",
            url: _HTTP_ADDRESS +'portal_support/appData/zyglData.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function (data) {
            console.log(data);

            /**
             * data字段
             * appData  应用资源 appCount 应用资源数量
             * dataData 数据资源
             * hardData 硬件资源
             * srvData  服务资源
             *
             * resProvideOrgTop  提供服务部门
               srvUseTop  服务资源使用
             * **/
            $scope.appCount = data.appCount;
            $scope.srvCount = data.srvCount;
            $scope.dataCount = data.dataCount;
            $scope.hardCount= data.hardCount;
            //生成图表
            $scope.appSource = chartPie(appTitle,data.appData,data.appCount)
            $scope.srvSource = chartPie(srvTitle,data.srvData,data.srvCount)
            $scope.dataSource = chartPie(dataTitle,data.dataData,data.dataCount)
            $scope.hardSource = chartPie(hardTitle,data.hardData,data.hardCount)
            //监控
            // for(var i =0;i<data.timeList.length;i++){
            //     data.timeList[i].split(' ')
            // }

            setChart(data.timeList,data.dataList)
            //统计
            $scope.resProvideOrgTop = data.resProvideOrgTop;
            $scope.srvUseTop = data.srvUseTop;

        }).error(function (error) {
            console.log(error);
        });

        //生成扇形图
        function chartPie(pieName,data,count){
            // console.log(pieName);
            // console.log(data);
            // console.log(count);
            var series = []
            for(var i=0;i<data.length;i++){
                var arr = [];
                arr.push(data[i].name,parseFloat(data[i].value));
                series.push(arr);
            }
            console.log(series);
            return {
                 credits:false,
                 chart:{
                     type:'pie'
                 },
                 title:{
                     floating:true,
                     text:pieName+'(全部：'+count+')',
                     margin:0,
                     style:{
                         fontSize:12
                     }
                 },
                 tooltip:{
                     headerFormat:'数量<br/>',
                     pointFormat:'{point.name}:{point.y}({point.percentage:.1f}%)'
                 },
                 plotOptions:{
                     pie:{
                         allowPointSelect:true,
                         cursor:'pointer',
                         showInLegend:true
                     }
                 },
                 series:[{
                     type:'pie',
                     // innerSize:'60%',
                     data: series
                 }]
             };
        }
        //初始扇形图数据
        $scope.appSource = {
            credits:false,
            chart:{
                type:'pie'
            },
            title:{
                floating:true,
                text:' ',
                margin:0,
                style:{
                    fontSize:12
                }
            },
            tooltip:{
                headerFormat:'数量<br/>',
                pointFormat:'{point.name}:{point.y}({point.percentage:.2f}%)'
            },
            plotOptions:{
                pie:{
                    allowPointSelect:true,
                    cursor:'pointer',
                    showInLegend:true
                }
            },
            series:[{
                type:'pie',
                // innerSize:'60%',
                data:[ ]
            }]
        };
        $scope.srvSource = {
            credits:false,
            chart:{
                type:'pie'
            },
            title:{
                floating:true,
                text:' ',
                margin:0,
                style:{
                    fontSize:12
                }
            },
            tooltip:{
                headerFormat:'数量<br/>',
                pointFormat:'{point.name}:{point.percentage:.1f}%'
            },
            plotOptions:{
                pie:{
                    allowPointSelect:true,
                    cursor:'pointer',
                    showInLegend:true,
                    dataLabels:{
                        enabled:true
                    }
                }
            },

            series:[{
                type:'pie',
                // innerSize:'60%',
                data:[]
            }]
        };
        $scope.dataSource = {
            credits:false,
            chart:{
                type:'pie'
            },
            title:{
                floating:true,
                text:' ',
                margin:0,
                style:{
                    fontSize:12
                }
            },
            tooltip:{
                headerFormat:'数量<br/>',
                pointFormat:'{point.name}:{point.percentage:.1f}%'
            },
            plotOptions:{
                pie:{
                    allowPointSelect:true,
                    cursor:'pointer',
                    showInLegend:true
                }
            },

            series:[{
                type:'pie',
                // innerSize:'60%',
                data:[ ]
            }]
        };
        $scope.hardSource = {
            credits:false,
            chart:{
                type:'pie'
            },
            title:{
                floating:true,
                text:' ',
                margin:0,
                style:{
                    fontSize:12
                }
            },
            tooltip:{
                headerFormat:'数量<br/>',
                pointFormat:'{point.name}:{point.percentage:.1f}%'
            },
            plotOptions:{
                pie:{
                    allowPointSelect:true,
                    cursor:'pointer',
                    showInLegend:true
                }
            },

            series:[{
                type:'pie',
                // innerSize:'60%',
                data:[ ]
            }]
        };
        //时间轴折线图
        function setChart(time,num) {
            console.log(time);
            var chartData =[];
            for(var i=0;i<num.length;i++){
                chartData.push(parseInt(num[i]))
            }
            $scope.serveAmount = {
                credits:false,
                chart:{
                    panning: true,//平移
                    zoomType: 'x',
                    pinchType: 'x',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    },
                    type:'line'
                },
                title:'服务请求量',
                plotOptions:{
                  visible:true
                },
                tooltip:{
                    // followTouchMove:false
                },
                xAxis:{
                    // type: 'datetime',
                    categories:time,
                    tickInterval:100,
                    tickPixelInterval:1000,
                    // minTickPixelInterval:100
                },
                yAxis:{
                    title:{enabled:false}
                },
                series: [{
                    type: 'line',
                    name: '请求数',
                    data: chartData
                }]

            };

        }
        //初始化时间轴图
        $scope.serveAmount = {
            chart:{
                type:'line'
            },
            title:'服务请求量',
            xAxis:{
                // type: 'datetime',
                categories:[]
            },
            yAxis:{
            },
            series: [{
                type: 'line',
                name: '可缩放时间轴',
                data: []
            }]

        };
        // 下滑栏
        $scope.slide1 = true;
        $scope.slide2 = true;
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
            console.log('拖动了');
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
            // if(direction(distanceX,distanceY)=='left'){
            //     $ionicScrollDelegate.$getByHandle('mainContent').scrollBy(-distanceX,0,[true]);
            // }
            // if(direction(distanceX,distanceY)=='right'){
            //     $ionicScrollDelegate.$getByHandle('mainContent').scrollBy(-distanceX,0,[true]);
            // }
            if(direction(distanceX,distanceY)=='up'){
                $ionicScrollDelegate.$getByHandle('mainContent').scrollBy(0,-distanceY,[true]);
            }
            if(direction(distanceX,distanceY)=='down'){
                $ionicScrollDelegate.$getByHandle('mainContent').scrollBy(0,-distanceY,[true]);
            }
        }























    })
})