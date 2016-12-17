'use strict'

app.controller('addfilmcontroller', function($scope, $rootScope, $state, $window, AuthenticationService) {

    
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
            }).catch(function(error) {
                console.error('Upload failed:', error);
            });

        }

        document.getElementById('input').addEventListener('change', handleFileSelect, false);
        document.getElementById('input').disabled = true;
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

    $scope.filmadd = function() {
        var vers = [];
        var lang;
        var theater;

        if (document.getElementById("ver1").checked === true) {
            var ver1 = { code: document.getElementById("ver1").value };
            vers.push(ver1);
        }
        if (document.getElementById("ver2").checked === true) {
            var ver2 = { code: document.getElementById("ver2").value };
            vers.push(ver2);
        }
        if (document.getElementById("ver3").checked === true) {
            var ver3 = { code: document.getElementById("ver3").value };
            vers.push(ver3);
        }
        if (document.getElementById("ver4").checked === true) {
            var ver4 = { code: document.getElementById("ver4").value };
            vers.push(ver4);
        }

        var state;
        if (document.getElementById("state1").checked === true) {
            state = true;
        } else {
            if (document.getElementById("state2").checked === true) {
                state = false;
            }
        }

        $.ajax({
            url: _url_host + '/v1/admin/films',
            type: 'PUT',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                "start_time": transformdate2(document.getElementById("start_date").value),
                "end_time": transformdate2(document.getElementById("end_date").value),
                "name": document.getElementById("film").value,
                "duration": document.getElementById("duration").value,
                "warning": document.getElementById("warning").value,
                "description": document.getElementById("description").value,
                "trailer": document.getElementById("trailer").value,
                "photo": $scope.url,
                "isNowShowing": state,
                "genre": document.getElementById("type").value,
                "actor": document.getElementById("actor").value,
                "director": document.getElementById("director").value,
                "lang": langs,
                "version": vers,
                "theaters": theaters
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

        setTimeout(function() {
            location.reload();
        }, 2000);
    };

    $scope.init = function() {
        $scope.languages = $rootScope.langlist;
        $scope.theaters = $rootScope.theaterlist;
    }

    var langs = [];
    var theaters = [];
    $scope.langlist = "";
    $scope.theaterlist = "";

    $scope.langinit = function() {
        if ($scope.language !== "Chọn ngôn ngữ") {
            $scope.langlist += $scope.language.name;
        }

        console.log($scope.language);
        if ($scope.language.name !== "Chọn ngôn ngữ") {
            var langobj = { code: $scope.language.code };
            langs.push(langobj);
            console.log(langs);
        }
    }

    $scope.theaterinit = function() {

        if ($scope.theater !== "Chọn rạp chiếu") {
            $scope.theaterlist += $scope.theater.name;
        }

        if ($scope.theaters.name !== "Chọn rạp chiếu") {
            var theaterobj = { code: $scope.theater.code };
            theaters.push(theaterobj);
            console.log(theaters);
        }
    }

    var transformdate = function(d) {
        var a = d.split("/");
        var s = a[2] + "-" + a[1] + "-" + a[0];
        return s;
    };

    var transformdate2 = function(d) {
        var a = d.split("-");
        var s = a[2] + "/" + a[1] + "/" + a[0];
        return s;
    }


});
