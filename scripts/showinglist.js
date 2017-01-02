'use strict'

app.controller('showinglistctrler', function($scope, $rootScope, $http, $state, $window, AuthenticationService) {

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    $scope.theaters = $rootScope.theaterlist;
    console.log($scope.theaters);
    $scope.list1 = [];

    $scope.theater;

    $scope.filmlistinit = function() {
        var tcode = $scope.theater.code;
        $scope.list1 = [];

        for (var x in $rootScope.filmlist1) {
            for (var y in $rootScope.filmlist1[x].theaters) {
                if ($rootScope.filmlist1[x].theaters[y].theater_code === tcode) {
                    $scope.list1.push($rootScope.filmlist1[x]);
                }
            }
        }
    };

    
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            var memDate = (new Date(currentDate)).toLocaleDateString();
            dateArray.push(memDate);
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    };

    var transformdate = function(d) {
        var a = d.split("/");
        var s = a[2] + "-" + a[1] + "-" + a[0];
        return s;
    };

    $scope.datelist = function() {
        var st = transformdate($scope.film.start_time);
        var et = transformdate($scope.film.end_time);
        $scope.dates = getDates(new Date(st), new Date(et));
        var t = [];
    };

    // $scope.versioninit = function() {
    //     $scope.version = $scope.film.versions;
    // }
    $scope.theater = null;
    $scope.film = null;
    $scope.date = null;
    $scope.getshowinglist = function() {
        $scope.showinglist = [];

        var url = '/v1/admin/schedules?theater-code='
        if ($scope.theater.code === null) {
            alert("Bạn chưa chọn rạp chiếu phim!!!");
        } else {
            var theatercode = $scope.theater.code;
            url = url + theatercode;
        }

        if ($scope.film !== null) {
            var filmcode = $scope.film.code;
            url = url + '&film-code=' + filmcode;
        }

        if ($scope.date !== null) {
            var date = transformDate($scope.date);
            url = url + '&date=' + date;
        }

        $.ajax({
            url: _url_host + url,
            datatype: 'json',
            data: {
                token: $window.sessionStorage.token
            },
            type: 'GET',
            dataType: 'json',
            success: function(data, status) {
                $scope.$apply(function() {
                    $scope.showinglist = data.data;
                });
                console.log($scope.showinglist);
            },
            error: function(data, status) {
                console.log(data);
            }
        });
    };

    $scope.edit = function(code) {
        $rootScope.editshowingcode = code;
    }

    var transformDate = function(fulldate) {
        var date = new Date(fulldate);
        var day = date.getDate();
        day = (day < 10) ? '0' + day : day;
        var month = date.getMonth() + 1;
        month = (month < 10) ? '0' + month : month;
        var year = date.getFullYear();
        var res = '';
        if (month >= 10) {
            return res.concat(day, "/", month, "/", year);
        } else {
            return res.concat(day, "/", month, "/", year);
        }
    };

    $scope.delete = function(code) {
        var showingcode = code;
        $.ajax({
            url: _url_host + '/v1/admin/schedules',
            type: 'DELETE',
            datatype: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                code: showingcode
            },
            success: function(data, status) {
                alert(status);
                console.log(status);
            },
            error: function(status) {
                alert(status);
                console.log(status);
            }
        });

        setTimeout(function() {
            location.reload();
        }, 2000);
    };


});
