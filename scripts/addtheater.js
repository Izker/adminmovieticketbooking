'use strict';

app.controller('addtheaterctrler', function($scope, $rootScope, $state, $window, AuthenticationService) {
    
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
    }
});

