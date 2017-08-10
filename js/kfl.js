/**
 * Created by bjwsl-001 on 2017/8/9.
 */

var app = angular.module('kflModule',
    ['utilityModule']);

//����״̬
app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('kflStart', {
        url: '/kflStart',
        templateUrl: 'tpl/start.html'
      })
      .state('kflMain', {
        url: '/kflMain',
        templateUrl: 'tpl/main.html',
        controller:'mainCtrl'
      })
      .state('kflDetail', {
        url: '/kflDetail/:did',
        templateUrl: 'tpl/detail.html',
        controller:'detailCtrl'
      })
      .state('kflOrder', {
        url: '/kflOrder',
        templateUrl: 'tpl/order.html'
      })
      .state('kflMyOrder', {
        url: '/kflMyOrder',
        templateUrl: 'tpl/myOrder.html'
      })
  $urlRouterProvider
      .otherwise('/kflStart')

})

//����һ����������
app.controller('parentCtrl', [
  '$scope', '$state',
  function ($scope, $state) {
    $scope.jump = function (desState,arg) {
      $state.go(desState,arg);
    }
  }
]);

//��Main����һ��������
app.controller('mainCtrl',
    ['$scope','$kflHttp',
      function ($scope,$kflHttp) {
        $scope.dishList = [];
        $scope.hasMore = true;
        $scope.inputTxt = {kw:''};

        $kflHttp.sendRequest(
            'data/dish_getbypage.php?start=0',
            function (data) {
              console.log(data);
              $scope.dishList = data;
            }
        )
        
        $scope.loadMore = function () {
          $kflHttp.sendRequest(
              'data/dish_getbypage.php?start='+$scope.dishList.length,
              function (data) {
                if(data.length < 5)
                {
                  $scope.hasMore = false;
                }
                $scope.dishList = $scope.dishList.concat(data);
                $scope.$broadcast('scroll.infiniteScrollComplete');
              }
          )
        }

        $scope.$watch(
            'inputTxt.kw',
            function () {
              //�����û������룬������������-����
              if($scope.inputTxt.kw.length > 0)
              {
                $kflHttp.sendRequest(
                    'data/dish_getbykw.php?kw='+$scope.inputTxt.kw,
                    function (data) {
                      if(data.length>0)
                      {
                        $scope.dishList = data;
                      }
                    }
                )
              }
            }
        );
        
      }
    ])

//��detail����һ��������
app.controller('detailCtrl',
    ['$scope','$kflHttp','$stateParams',
      function (
          $scope,$kflHttp,$stateParams) {
        console.log($stateParams);
        var id = $stateParams.did;
        $kflHttp.sendRequest(
            'data/dish_getbyid.php?did='+id,
            function (data) {
              console.log(data);
              $scope.dish = data[0];
            }
        )
      }

    ])