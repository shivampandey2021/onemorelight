"use strict";

var app = angular.module('myApp', ['ngRoute']);

//rout provider

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/register/register.html',
            }).
            when('/connect-users', {
                templateUrl: 'views/users/users.html',
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);


app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
