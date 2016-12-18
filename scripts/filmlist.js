'use strict'

app.controller('filmlistctrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    $scope.list1 = $rootScope.filmlist1;
    $scope.list2 = $rootScope.filmlist2;

    $scope.edit1 = function(code) {
        $rootScope.code = code;
        $state.go("editfilm");
    };

    $scope.delete = function(code) {
        var filmcode = code;
        $.ajax({
            url: _url_host + '/v1/admin/films',
            type: 'DELETE',
            datatype: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                code: filmcode
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
    }
});
