var module = angular.module('module',[]);
module.controller('controller',($scope,$http)=>{
    $scope.medicine_array;
    $scope.cities_array;
    $scope.city;
    $scope.founded_medicine;
    $scope.available_med = function() {
        //alert('hello')
        $http.get('/med').then(ok,nok);
        function ok(response) {
            //alert(JSON.stringify(response.data));
            $scope.medicine_array = response.data;
            //alert(JSON.stringify($scope.medicine_array));
        }
        function nok(response) {
            alert(JSON.stringify(response.data));
        }
        
    }
    $scope.cityfuntion = function(){
        $http.get('/fetchcity').then(ok,nok);
        function ok(response) {
            //alert(JSON.stringify(response.data));
            $scope.cities_array = response.data;
            //alert(JSON.stringify($scope.medicine_array));
            available_med();
        }
        function nok(response) {
            alert(JSON.stringify(response.data));
        }
    }
    $scope.search = function() {
        //alert($scope.medicine);
        $scope.url = '/providers?medname='+$scope.medicine+"&city="+$scope.city;
        $http.get($scope.url).then(ok,nok);
        function ok(response) {
            
            //alert(JSON.stringify(response.data));
            //$scope.cities_array = response.data;
            //alert(JSON.stringify($scope.medicine_array));
            $scope.founded_medicine = response.data;
            medicine();
        }
        function nok(response) {
            alert(JSON.stringify(response.data));
        }
    }
    $scope.provider_details_data;
        $scope.provider_details = function(email){
        $scope.provider_details_data = email;
        $http.get('/provider_details?email='+email).then(ok,nok);
        function ok(response) {
            // alert(JSON.stringify(response.data));
            $scope.provider_details_data = response.data;
        }
        function nok(response) {
            alert(JSON.stringify(response.data));
        }
    }
    
})