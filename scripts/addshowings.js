'use strict'

app.controller('addshowingcontroler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    
    $( "#time_d" ).timeDropper({init_animation:'dropDown', autoswitch: true, format: "HH:mm",
                                backgroundColor: '#fff'});

    $("#date_a").dateDropper();

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    $scope.theaters = $rootScope.theaterlist;
    

    $scope.roomlistinit = function() {
        var tcode = $scope.atheater.code;
        //disable chọn room
        $('#room').prop('disabled', 'disabled');
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
                $('#room').prop('disabled', false);
            },
            error: function(status) {
                $('#room').prop('disabled', false);
                alert(status);
            }
        });
    };

    $scope.films = $rootScope.filmlist1;

    $scope.updateRoomID = function() {
        $scope.roomlistinit();
    }

    $scope.addshowing = function() {
        var date = document.getElementById("date_a").value;
        var st = document.getElementById("time_d").value;
        var price = [];

        if (document.getElementById("ver1").checked === true) {
            var ver1 = [{ "version_code": document.getElementById("ver1").value, "price": document.getElementById("ticketprice").value }];
            price = ver1;
        }
        if (document.getElementById("ver2").checked === true) {
            var ver2 = [{ "version_code": document.getElementById("ver2").value, "price": document.getElementById("ticketprice").value }];
            price = ver2;
        }
        if (document.getElementById("ver3").checked === true) {
            var ver3 = [{ "version_code": document.getElementById("ver3").value, "price": document.getElementById("ticketprice").value }];
            price = ver3;
        }
        if (document.getElementById("ver4").checked === true) {
            var ver4 = [{ "version_code": document.getElementById("ver4").value, "price": document.getElementById("ticketprice").value }];
            price = ver4;
        }

        var filmcode = $scope.afilm.code;
        var theatercode = $scope.atheater.code;
        var roomcode = $scope.room.code;
        console.log(filmcode);
        console.log(theatercode);
        console.log(roomcode);
        console.log(date);
        console.log(price);
        console.log(st);
        $.ajax({
            url: _url_host + '/v1/admin/schedules',
            type: 'PUT',
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

    var transformdate2 = function(d) {
        var a = d.split("-");
        var s = a[2] + "/" + a[1] + "/" + a[0];
        return s;
    }
});
