var module = angular.module('module',[]);
module.controller('controller',($scope,$http)=>{
    $scope.email= 'asdad';
    $scope.value = "Save";
    $scope.url;
    $scope.search = function(){
        //alert('working')
        $http.get('/search_needy_profile?email='+$scope.email).then(ok,nok);
        function ok(response) {
            if(response.data.length>0){
                $scope.value = 'update';
                $scope.url = '/update_needy_profile';
            }else{
                $scope.value = 'save';
                $scope.url = '/save_needy_profile';
            }
            //alert(JSON.stringify(response.data));
        }
        function nok(response) {
            alert(response.data);
        }
    }
});