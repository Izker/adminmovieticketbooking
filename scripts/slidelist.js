'use strict'

app.controller('slidelistctrler', function($scope, $rootScope, $http, $state, $window, AuthenticationService) {

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    $scope.slidelist = $rootScope.sliders;

    $scope.edit = function(code) {
        $rootScope.editslidecode = code;
    }

});
