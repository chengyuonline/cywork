
define(['app'], function(app) {
    'use strict';
    app.controller('MainCtl',function($scope, $state){

        $scope.changePage = function(txt) {
            switch (txt) {
                case 0:
                    //无数据
                    $state.go("test1");
                    break;
                case 1:
                    //水资源管理
                    $state.go("waterResource");
                    break;
                case 2:
                    //水资源管理
                    $state.go("constructMng");
                    break;
                case 3:
                    $state.go("countryWater");
                    break;
                case 4:
                    //河长圈
                    $state.go("underWater");
                    break;
                case 5:
                    //视频监测
                    $state.go("video");
                    break;
                case 7:
                    //雨水情
                    $state.go("rain");
                    break;
                case 8:
                    //资源管理
                    $state.go("sourceMng");
                    break;
                case 9:
                    //模型管理
                    $state.go("modelMng");
                    break;
                case 10:
                    //目录管理
                    $state.go("catalogMng");
                    break;
                case 11:
                    //基础信息
                    $state.go("bInfo_index");
                    break;
                // case 12:
                //     //河湖档案 file
                //     $state.go("bInfo_countryWater");
                //     break;
                // case 13:
                //     //河湖档案 file
                //     $state.go("bInfo_underWater");
                //     break;
            }
        }

    })
});
