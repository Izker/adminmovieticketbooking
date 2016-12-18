'use strict'

app.controller('theaterlistctrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    $scope.logout1 = function() {
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("login");
        }
    };

    //list tỉnh thành phố
    $scope.provinces = $rootScope.citys;
    //list rap chieu phim theo tinh
    $scope.ptheaters = [];

    $scope.showtheaters = function(provincecode) {
        $scope.ptheaters = [];
        for (var x in $rootScope.theaterlist) {
            if (provincecode === $rootScope.theaterlist[x].city_code) {
                $scope.ptheaters.push($rootScope.theaterlist[x]);
            }
        }
        document.getElementById("hanoi").style.display = "initial";
    };

    $scope.showtheaterinfo = function(name, citycode, code) {

        $rootScope.fcode = code;
        document.getElementById("theatername").innerHTML = name;
        var cityname;
        for (var x in $rootScope.citys) {
            if ($rootScope.citys[x].code === citycode) {
                cityname = $rootScope.citys[x].name;
            }
        }
        document.getElementById("address").innerHTML = cityname;
    }

    $scope.uploadphoto = function() {
        // Initialize Firebase

        var auth = firebase.auth();
        var storageRef = firebase.storage().ref();

        function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var file = evt.target.files[0];
            var url;
            var metadata = {
                'contentType': file.type
            };

            storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
                console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                console.log(snapshot.metadata);
                $scope.url = snapshot.metadata.downloadURLs[0];
                document.getElementById("input1").disabled = true;
                document.getElementById("input1").disabled = false;
            }).catch(function(error) {
                console.error('Upload failed:', error);
            });
        };

        document.getElementById("input1").addEventListener('change', handleFileSelect, false);

        auth.onAuthStateChanged(function(user) {
            if (user) {
                console.log('Anonymous user signed-in.', user);
                document.getElementById('input').disabled = false;
            } else {
                console.log('There was no anonymous session. Creating a new anonymous user.');
                // Sign the user in anonymously since accessing Storage requires the user to be authorized.
                auth.signInAnonymously();
            }
        });
    }

    $scope.theateradd = function() {
        var photo = [{ "link": $scope.url }];
        var room2 = document.getElementById("room2").value;
        var roomtype2 = document.getElementById("roomtype2").value;
        var room = [{ "name": room2, "type": roomtype2 }];
        console.log(photo);
        console.log(room2);
        console.log(roomtype2);
        console.log(room);
        console.log(document.getElementById("tel2").value);
        console.log(document.getElementById("address2").value);
        console.log(document.getElementById("theatername2").value);
        console.log(document.getElementById("map2").value);
        console.log($scope.city.code);

        $.ajax({
            url: _url_host + '/v1/admin/theaters',
            type: 'PUT',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                "name": document.getElementById("theatername2").value,
                "address": document.getElementById("address2").value,
                "tel": document.getElementById("tel2").value,
                "map": document.getElementById("map2").value,
                "photos": photo,
                "rooms": room,
                "city-code": $scope.city.code
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
        location.reload();
    };

    $scope.uploadpicture = function() {
        // Initialize Firebase

        var auth = firebase.auth();
        var storageRef = firebase.storage().ref();

        function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var file = evt.target.files[0];
            var url;
            var metadata = {
                'contentType': file.type
            };

            storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
                console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                console.log(snapshot.metadata);
                $scope.url = snapshot.metadata.downloadURLs[0];
                document.getElementById("input3").disabled = true;
                document.getElementById("input3").disabled = false;
            }).catch(function(error) {
                console.error('Upload failed:', error);
            });

        };

        document.getElementById("input3").addEventListener('change', handleFileSelect, false);

        auth.onAuthStateChanged(function(user) {
            if (user) {
                console.log('Anonymous user signed-in.', user);
                document.getElementById('input3').disabled = false;
            } else {
                console.log('There was no anonymous session. Creating a new anonymous user.');
                // Sign the user in anonymously since accessing Storage requires the user to be authorized.
                auth.signInAnonymously();
            }
        });
    };

    $scope.theateredit = function() {
        var photo = [{ "link": $scope.url }];
        var room2 = document.getElementById("room3").value;
        var roomtype2 = document.getElementById("roomtype3").value;
        var room = [{ "name": room2, "type": roomtype2 }];
        var fcode = $rootScope.fcode;

        $.ajax({
            url: _url_host + '/v1/admin/theaters',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {

                "name": document.getElementById("theatername3").value,

                "address": document.getElementById("address3").value,
                "tel": document.getElementById("tel3").value,
                "map": document.getElementById("map3").value,
                "photos": photo,
                "rooms": room,
                "city-code": $scope.city.code,
                "code": fcode
            },
            success: function(data, textStatus) {
                console.log(textStatus);
                if (data.success != "false") {
                    alert("successfully");
                    location.reload();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
                alert(textStatus);
            }
        });
    };

    // $scope.delete = function() {

    //     var fcode = $rootScope.fcode;
    //     $.ajax({
    //         url: _url_host + '/v1/admin/theaters',
    //         type: 'DELETE',
    //         dataType: 'json',
    //         headers: {
    //             'Accept': 'application/json',
    //             'x-access-token': $window.sessionStorage.token
    //         },
    //         data: {
    //             "code": fcode
    //         },
    //         success: function(data, textStatus) {
    //             console.log(textStatus);
    //             if (data.success != "false") {
    //                 alert("successfully");
    //                 location.reload();
    //             }
    //         },
    //         error: function(jqXHR, textStatus, errorThrown) {
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //             alert(textStatus);
    //         }
    //     });
    // };

    $scope.delete = function() {
        
        var fcode = $rootScope.fcode;
        $.ajax({
            url: _url_host + '/v1/admin/theaters',
            type: 'DELETE',
            datatype: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                code: fcode
            },
            success: function(data, status) {
                alert(status);
                console.log(status);
                location.reload();
            },
            error: function(status) {
                alert(status);
                console.log(status);
            }
        });
    }
});
