    // Define AngularJS module
    angular.module('myApp', []);

    // Define AngularJS controller
    angular.module('myApp').controller('myController', function ($scope) {
        $scope.user = {};

        $scope.see = function () {
            var input = document.getElementById("passw");
            var see = document.getElementById("see");
            if (input.type === 'password') {
                input.type = 'text';
                see.style.color = '#262626';
            } else {
                input.type = 'password';
                see.style.color = 'gray';
            }
        };

        $scope.isLengthValid = function () {
            return $scope.user.password && $scope.user.password.length >= 5;
        };

        $scope.isLengthLessValid = function () {
            return $scope.user.password && $scope.user.password.length <= 10;
        };

        $scope.hasNumericalChar = function () {
            return $scope.user.password && /\d/.test($scope.user.password);
        };

        $scope.hasSpecialChar = function () {
            return $scope.user.password && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test($scope.user.password);
        };

        $scope.hasNoSpaces = function () {
            return $scope.user.password && !$scope.user.password.includes(' ');
        };

        $scope.validateForm = function () {
            if (!$scope.user.username) {
                alert("Username must be filled out");
                return false;
            }

            if (!$scope.user.password) {
                alert("Password must be filled out");
                return false;
            }
        };
    });

