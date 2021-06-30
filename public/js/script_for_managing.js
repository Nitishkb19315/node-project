var module = angular.module('module',[]);
module.controller('controller',function($scope,$http){
    $scope.array;
    $scope.email;
    $scope.fetch= function(){
        $scope.url = '/fetchMed?email='+$scope.email;
        $http.get($scope.url).then(ok,nok);
        function ok(response){
            //alert(JSON.stringify( response.data))
            $scope.array = response.data;
        }
        function nok(response){
            alert('not working properly')
        }
    }
    $scope.delete = function(uid){
        alert(uid)
         $http.get('/sold-medicine?uid='+uid).then(ok,nok)
        function ok(response){
            alert(JSON.stringify( response.data))
            $scope.fetch();
            
        }
        function nok(response){
            alert(JSON.stringify(response.data) );
        }
    }
});