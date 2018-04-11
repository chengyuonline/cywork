define(['app'],function(app){
    'use strict';
    var dataAll = [];
    var codeArr = [] ;//类名代码
    app.controller('bInfoCtrl',function($scope,$state,$http){
        $http({
            methods:'POST',
            url:_HTTP_ADDRESS +'portal_support/appData/jcxxData.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        }).success(function(data){
            console.log(data);
            console.log(dataAll)

            var ncode = [];//图表分类名
            var allProvinceData = [];
            var count = 0;
            for(var key in data){
                count++;
                data[key].name.splice(0,1);
                codeArr.push(key);
                allProvinceData.push(parseInt(data[key].value.shift()));
            }
            codeArr.sort(function(a,b){
                var aN = a.substring(1,4);
                var bN = b.substring(1,4);
                return aN-bN;
            })
            console.log(codeArr);
            console.log(count)
             for(var i=0;i<codeArr.length;i++){
              ncode.push(trans(codeArr[i]));
             var codeV =  data[codeArr[i]].value;// code对象中value 的数组
                 var codeVN =[]
                codeV.forEach(function(value){//循环到了每个数据
                   codeVN.push(parseInt(value))
                })
                 data[codeArr[i]].value = codeVN;
             }
             console.log(codeArr);
            console.log(ncode);
            console.log(allProvinceData);
            console.log(data);
            //生成图表
            chartConfig(data,codeArr,allProvinceData);
        }).error(function(error){
            console.log(error);
        })
        //代码转换  p101-->'河流'
        function trans(code){
            switch (code){
                case 'P101':
                    return '河流'
                break;
                case 'P102':
                    return '观测站'
                    break;
                case 'P104':
                    return '湖泊'
                    break;
                case 'P201':
                    return '水库工程'
                    break;
                case 'P202':
                    return '水电站工程'
                    break;
                case 'P203':
                    return '水闸工程'
                    break;
                case 'P204':
                    return '橡胶坝'
                    break;
                case 'P205':
                    return '泵站工程'
                    break;
                case 'P206':
                    return '引调水工程'
                    break;
                case 'P207':
                    return '堤防工程'
                    break;
                case 'P208':
                    return '农村供水工程'
                    break;
                case 'P301':
                    return '规模化畜禽养殖场'
                    break;
                case 'P303':
                    return '公共供水企业'
                    break;
                case 'P304':
                    return '工业企业'
                    break;
                case 'P305':
                    return '建筑业与第三产业用水户'
                    break;
                case 'P401':
                    return '河湖取水口'
                    break;
                case 'P402':
                    return '地表水水源地'
                    break;
                case 'P405':
                    return '入河湖排污口'
                    break;
                case 'P502':
                    return '治沟骨干工程'
                    break;
                case 'P601':
                    return '水利行业单位'
                    break;
                case 'P602':
                    return '水利行政机关'
                    break;
                case 'P603':
                    return '水利事业单位'
                    break;
                case 'P604':
                    return '水利企业'
                    break;
                case 'P605':
                    return '水利社会团体'
                    break;
                case 'P606':
                    return '乡镇水利管理单位'
                    break;
                case 'P701':
                    return '灌区'
                    break;
                case 'P702':
                    return '渠道'
                    break;
                case 'P801':
                    return '规模以上水井'
                    break;
                case 'P802':
                    return '地下水水源地'
                    break;
                case 'P905':
                    return '塘坝工程'
                    break;
                case 'P906':
                    return '窖池工程'
                    break;

            }
        }
        //生成图表
        function chartConfig(data,categories,series){
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
                    text:'全国水利基础对象统计',
                    style:{
                        fontSize:15
                    }
                },
                tooltip:{
                    followTouchMove:false,
                    formatter:function(){
                        return trans(this.x) + "<br/>全国统计:" + this.y+"条"
                    }
                },
                plotOptions:{
                    series:{
                        events:{
                            click:function(e){
                                // console.log(e.point.category);
                                // console.log(this);
                                // chartConfig_sec(data,e.point.category);
                                // $scope.$apply()
                            }
                        }
                    }
                },
                xAxis:{
                    categories: categories,
                    min:0,
                    max:4,
                    labels:{
                        enabled:true,
                        // rotation:90,
                        formatter:function(){
                            return trans(this.value)
                        }
                    }
                    // tickPixelInterval:200
                    // minTickPixelInterval:20
                },
                yAxis:{

                    title:{
                        text:'(条)',
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
                    name:'全国水利基础对象统计(条)',
                    data:series
                }]
            };
        }
        //下钻图表
        function chartConfig_sec(dataAll,code){
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
                    text:'全国统计',
                    style:{
                        fontSize:15
                    }
                },
                tooltip:{
                    followTouchMove:false
                },
                plotOptions:{
                },
                xAxis:{
                    categories: dataAll[code].name,
                    min:0,
                    max:4,
                    labels:{
                        enabled:true,
                        // rotation:90,
                        formatter:function(){
                            console.log(this.point)

                        }
                    }
                },
                yAxis:{
                    title:{
                        text:'(条)',
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
                    name:'全国统计',
                    data:dataAll[code].value
                }]
            };
            $scope.$apply();
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
                text:'全国水利基础对象统计',
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
                name:'全国统计(条)',
                data:[]
            }]
        };
        $scope.chartH = Math.min(document.documentElement.clientHeight,window.innerHeight)-48;

        //查找元素在数组中位置
        function indexOf(arr,item){
            if(Array.protopy.indexOf){
                return arr.indexOf(item);
            }else{
                for( var i=0;i<arr.length;i++){
                    if(arr[i]===item)
                        return i;
                    else return -1;
                }
            }
        }

    })

})