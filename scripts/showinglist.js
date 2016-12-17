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
    var theatercode;

    $scope.gettheater = function(code) {
        theatercode = code;
       
    };

    $scope.getfilmlist = function() {
        for (var x in $rootScope.filmlist1) {
            if ($rootScope.filmlist1[x].code === theatercode) {
                $scope.list1.push($rootScope.filmlist1[x]);
            }
        }
    }






    $scope.edit1 = function(code) {
        $rootScope.code = code;
        $state.go("editfilm");
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
