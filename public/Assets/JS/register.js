const app = angular.module('myApp', ['ngAnimate']);

app.controller("register",function($scope,$http){
    console.log($scope.gender);
    $scope.getVal=function(){
        console.log($scope.gender);
        $scope.gender1=$scope.gender;
        console.log($scope.gender1);

     }
    $scope.register = function(){
        $http({
            method:"POST",
            url:"/signup",
            data:{
                fname:$scope.fname,
                lname:$scope.lname,
                gender:$scope.gender,
                email:$scope.email,
                password:$scope.pwd,
            }
        }).then((resp)=>{
            console.log(resp.data);
            alert(resp.data.message);
            window.location.href="/HomePg.html"
     })
    }
});
