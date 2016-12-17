'use strict'

app.controller('theaterlistctrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    $scope.provinces = $rootScope.citys;

    $scope.hn = [{
        "name": "CGV Vincom Center Bà Triệu"
    }, {
        "name": "CGV MIPEC Tower"
    }, {
        "name": "CGV Hồ Gươm Plaza"
    }];

    $scope.hcm = [{
        "name": "CGV Hùng Vương Plaza"
    }, {
        "name": "CGV CT Plaza"
    }, {
        "name": "CGV Paragon"
    }];

    $scope.danang = [{
        "name": "CGV Vĩnh Trung Plaza"
    }, {
        "name": "CGV Vincom Đà Nẵng"
    }];

    $scope.dongnai = [{
        "name": "CGV Big C Đồng Nai"
    }, {
        "name": "CGV Biên Hòa"
    }];

    document.getElementById("hochiminh").style.display = "none";
    document.getElementById("danang").style.display = "none";
    document.getElementById("dongnai").style.display = "none";
    document.getElementById("hanoi").style.display = "initial";
    $scope.showtheaters = function(id) {
        document.getElementById("hochiminh").style.display = "none";
        document.getElementById("danang").style.display = "none";
        document.getElementById("dongnai").style.display = "none";
        document.getElementById("hanoi").style.display = "none";
        document.getElementById(id).style.display = "initial";
    };

    $scope.showtheaterinfo = function(name) {
        document.getElementById("theatername").innerHTML = name;
        document.getElementById("address").innerHTML = "Tầng 6, Toà nhà VinCom Center Hà Nội 191 đường Bà Triệu Quận Hai Bà Trưng Hà Nội";
    }
});
