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

});


