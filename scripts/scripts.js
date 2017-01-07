'use strict';
var app = angular.module('yapp', ['ui.router', 'snap', 'ngAnimate']);
app.factory('AuthenticationService', function($window) {
    var mlogged = false;
    if ($window.sessionStorage.token) {
        mlogged = true;
    }
    var auth = {
        isLogged: mlogged
    }
    return auth;
});
app.factory('UserService', function($http) {
    return {
        logIn: function(username, password) {
            return $.ajax({
                url: _url_host + '/v1/admin/users',
                type: 'POST',
                dataType: 'json',
                data: {
                    'username': username,
                    'password': password
                },
            });
        },

        logOut: function() {

        }
    }
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


angular.module("yapp").run(function($rootScope, $state, $http, $window, AuthenticationService) {
    $http.defaults.headers.common.Authorization = $window.sessionStorage.token;

    $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {

        //delay html loading
        function sleep(delay) {
            var start = new Date().getTime();
            while (new Date().getTime() < start + delay);
        }
        sleep(400);

        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            event.preventDefault();
            $state.go("login");
        }
    });

    if (AuthenticationService.isLogged === true) {
        $.ajax({
            url: _url_host + '/v1/admin/films',
            datatype: 'json',
            data: {
                token: $window.sessionStorage.token
            },
            type: 'GET',
            dataType: 'json',
            success: function(data, status) {

                var filmlist = data.data;
                console.log(filmlist);
                $rootScope.filmlist1 = [];
                $rootScope.filmlist2 = [];
                for (var x in filmlist) {
                    if (filmlist[x].isNowShowing === true) {
                        $rootScope.filmlist1.push(filmlist[x]);
                    } else {
                        $rootScope.filmlist2.push(filmlist[x]);
                    }
                }
            },
            error: function(data, status) {
                console.log(data);
            }
        });

        $.ajax({
            url: _url_host + '/v1/admin/languages',
            datatype: 'json',
            data: {
                token: $window.sessionStorage.token
            },
            type: 'GET',
            dataType: 'json',
            success: function(data, status) {
                var langlist = data.data;
                $rootScope.langlist = langlist;
            },
            error: function(data, status) {
                console.log(data);
            }
        });

        $.ajax({
            url: _url_host + '/v1/admin/theaters',
            datatype: 'json',
            data: {
                token: $window.sessionStorage.token
            },
            type: 'GET',
            dataType: 'json',
            success: function(data, status) {
                var theaterlist = data.data;
                $rootScope.theaterlist = theaterlist;
            },
            error: function(data, status) {
                console.log(data);
            }
        });

        $.ajax({
            url: _url_host + '/v1/admin/citys',
            datatype: 'json',
            data: {
                token: $window.sessionStorage.token
            },
            type: 'GET',
            dataType: 'json',
            success: function(data, status) {
                var citys = data.data;
                $rootScope.citys = citys;
            },
            error: function(data, status) {
                console.log(data);
            }
        });
    }
});

app.config(["$stateProvider", "$urlRouterProvider", function(r, t) {
    t.when("/dashboard", "/dashboard/overview"), t.otherwise("/login"), r.state("base", {
            "abstract": !0,
            url: "",
            templateUrl: "views/base.html",
            access: { requiredLogin: true }
        })
        .state("login", {
            url: "/login",
            parent: "base",
            templateUrl: "views/login.html",
            controller: "LoginCtrl",
            access: { requiredLogin: false }
        })
        .state("dashboard", {
            url: "/dashboard",
            parent: "base",
            templateUrl: "views/dashboard.html",
            controller: "DashboardCtrl",
            access: { requiredLogin: true }
        })
        .state("slide", {
            url: "/overview",
            parent: "dashboard",
            templateUrl: "views/dashboard/slide.html",
            controller: "homectrler",
            access: { requiredLogin: true }
        })
        .state("filmlist", {
            url: "/filmlist",
            parent: "dashboard",
            templateUrl: "views/dashboard/filmlist.html",
            controller: "filmlistctrler",
            access: { requiredLogin: true }
        })
        .state("showinglist", {
            url: "/showinglist",
            parent: "dashboard",
            templateUrl: "views/dashboard/showinglist.html",
            controller: "showinglistctrler",
            access: { requiredLogin: true }
        })
        .state("ticketpricelist", {
            url: "/ticketpricelist",
            parent: "dashboard",
            templateUrl: "views/dashboard/ticketpricelist.html",
            controller: "ticketpricelistctrler",
            access: { requiredLogin: true }
        })
        .state("editfilm", {
            url: "/editfilm",
            parent: "dashboard",
            templateUrl: "views/dashboard/editfilm.html",
            controller: "editfilmctrler",
            access: { requiredLogin: true }
        })
        .state("theaterlist", {
            url: "/theaterlist",
            parent: "dashboard",
            templateUrl: "views/dashboard/theaterlist.html",
            controller: "theaterlistctrler",
            access: { requiredLogin: true }
        })
}]);

app.controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$window', '$state', 'UserService', 'AuthenticationService', function($rootScope, $scope, $http, $window,
    $state, UserService, AuthenticationService) {


    $scope.isLogin = true;
    if (AuthenticationService.isLogged) {
        AuthenticationService.isLogged = false;
        delete $window.sessionStorage.token;
        $state.go("login");
    }

    $scope.login = function() {
        $scope.isLogin = false;
        var username = $scope.loginName;
        var password = $scope.loginPassword;
        if (username !== undefined && password !== undefined) {

            UserService.logIn(username, password).done(function(data) {
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $http.defaults.headers.common.Authorization = 'JWT ' + data.token;

                $.ajax({
                    url: _url_host + '/v1/admin/films',
                    datatype: 'json',
                    data: {
                        token: data.token
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(data, status) {

                        var filmlist = data.data;
                        console.log(filmlist);
                        $rootScope.filmlist1 = [];
                        $rootScope.filmlist2 = [];
                        for (var x in filmlist) {
                            if (filmlist[x].isNowShowing === true) {
                                $rootScope.filmlist1.push(filmlist[x]);
                            } else {
                                $rootScope.filmlist2.push(filmlist[x]);
                            }
                        }
                    },
                    error: function(data, status) {
                        console.log(data);
                    }
                });

                $.ajax({
                    url: _url_host + '/v1/admin/languages',
                    datatype: 'json',
                    data: {
                        token: data.token
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(data, status) {
                        var langlist = data.data;
                        $rootScope.langlist = langlist;
                    },
                    error: function(data, status) {
                        console.log(data);
                    }
                });

                $.ajax({
                    url: _url_host + '/v1/admin/theaters',
                    datatype: 'json',
                    data: {
                        token: data.token
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(data, status) {
                        var theaterlist = data.data;
                        $scope.$apply(function() {
                            $rootScope.theaterlist = theaterlist;
                        });
                    },
                    error: function(data, status) {
                        console.log(data);
                    }
                });

                $.ajax({
                    url: _url_host + '/v1/admin/citys',
                    datatype: 'json',
                    data: {
                        token: data.token
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function(data, status) {
                        var citys = data.data;
                        $rootScope.citys = citys;
                    },
                    error: function(data, status) {
                        console.log(data);
                    }
                });

                $state.go("filmlist");
            }).fail(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
    }

    $scope.logout = function logout() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    }

    $scope.register = function() {
        if ($scope.regConPass === $scope.regPass) {
            $.ajax({
                url: _url_host + 'api/v1/register',
                type: 'POST',
                method: 'POST',
                dataType: 'json',
                data: {
                    'username': $scope.regName,
                    'password': $scope.regPass
                },
                success: function(data, textStatus) {
                    console.log(textStatus);
                    if (data.success != "false") {
                        alert("successfully");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    alert(textStatus);

                }
            });
        } else {
            alert("Confirm password is incorrect!!!");
        }
    }

}]);

app.controller("DashboardCtrl", ["$scope", "$state", function(r, t) {
    r.$state = t
}]);
