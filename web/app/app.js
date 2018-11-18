'use strict';

// Declare app level module which depends on views, and core components
const app = angular.module(
    'app', [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap',
        'ngCookies',
        'ngStorage'
    ]);

app.config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    setRoute($routeProvider);
}]);


app.run(["$rootScope", "$http", "$location", "tools", "$cookies", appRun]);

function appRun($rootScope, $http, $location, tools, $cookies) {
    tools.hasNetWork();
    setCookies($cookies, $rootScope, tools, $http);
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
    });

    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        if ($location.path().indexOf('/login') !== -1) {
            $rootScope.showHeader = false;
        } else {
            $rootScope.showHeader = true;
        }
    });
}

function setCookies($cookies, $rootScope, tools, $http) {
    if ($cookies.getObject(tools.cookieName())) {
    }
}
function setRoute($routeProvider) {
    $routeProvider
        .when("/", {
            cache: false,
            redirectTo: "/home"
        })
        .when("/home", {
            templateUrl: "views/home.html",
            controller: "homeController"
        })
}