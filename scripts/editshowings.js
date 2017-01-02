'use strict'

app.controller('editshowingctrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    $("#time_e").timeDropper({ init_animation: 'dropDown', autoswitch: true, format: "HH:mm", backgroundColor: '#fff' });

    $("#date_e").dateDropper();

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    $scope.theaters = $rootScope.theaterlist;
    $scope.rooms = $rootScope.rooms;

    $scope.roomlistinit = function() {
        var tcode = $scope.etheater.code;
        $.ajax({
            url: _url_host + '/v1/admin/rooms?theater-code=' + tcode,
            type: 'GET',
            datatype: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            success: function(data, status) {
                $scope.$apply(function() {
                    $scope.rooms = data.data;
                });
            },
            error: function(status) {
                alert(status);
            }
        });
    };

    $scope.films = $rootScope.filmlist1;

    $scope.saveshowing = function(code) {
        var date = document.getElementById("date_e").value;
        var st = document.getElementById("time_e").value;
        var price = [];

        if (document.getElementById("ver11").checked === true) {
            var ver1 = [{ "version_code": document.getElementById("ver11").value, "price": document.getElementById("ticketprice").value }];
            price = ver1;
        }
        if (document.getElementById("ver22").checked === true) {
            var ver2 = [{ "version_code": document.getElementById("ver22").value, "price": document.getElementById("ticketprice").value }];
            price = ver2;
        }
        if (document.getElementById("ver33").checked === true) {
            var ver3 = [{ "version_code": document.getElementById("ver33").value, "price": document.getElementById("ticketprice").value }];
            price = ver3;
        }
        if (document.getElementById("ver44").checked === true) {
            var ver4 = [{ "version_code": document.getElementById("ver44").value, "price": document.getElementById("ticketprice").value }];
            price = ver4;
        }

        var filmcode = $scope.film.code;
        var theatercode = $scope.etheater.code;
        var roomcode = $scope.room.code;
        var editshowingcode = $rootScope.editshowingcode;
        console.log(filmcode);
        console.log(theatercode);
        console.log(roomcode);
        console.log(date);
        console.log(price);
        console.log(st);
        console.log(editshowingcode);
        $.ajax({
            url: _url_host + '/v1/admin/schedules',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                "date": date,
                "theater-code": theatercode,
                "film-code": filmcode,
                "room-code": roomcode,
                "time": st,
                "prices": price,
                "code": editshowingcode,
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
    };
});
