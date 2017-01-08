'use strict'

app.controller('editslidectrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    // $scope.init = function() {
    //     for (var x in $rootScope.sliders) {
    //         if ($rootScope.sliders[x].code === $rootScope.editslidecode) {
    //             document.getElementById("title").value = $rootScope.sliders[x].title;

    //             document.getElementById("desc").value = $rootScope.sliders[x].desc;
    //             if ($rootScope.sliders[x].isshow === true) {
    //                 document.getElementById("now").checked = true;
    //             } else {
    //                 document.getElementById("notnow").checked = true;
    //             }
    //         }
    //     }
    // };

    $scope.uploadposter = function() {
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

    $scope.saveslide = function() {

        $scope.editslidecode = $rootScope.editslidecode;
        if(document.getElementById("now").checked === true){
            $scope.isshow = document.getElementById("now").value;
        } else {
            $scope.isshow = document.getElementById("notnow").value;
        }

        $.ajax({
            url: _url_host + '/v1/admin/slider',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'x-access-token': $window.sessionStorage.token
            },
            data: {
                "title": document.getElementById("title").value,
                "photo": $scope.url,
                "desc": document.getElementById("desc").value,
                "code" : $scope.editslidecode,
                "isshow": $scope.isshow,
            },
            success: function(data, textStatus) {
                console.log(textStatus);
                if (data.success != "false") {
                    alert("successfully");
                    $("#slidetitle").val(null);
                    $("#slidedesc").val(null);
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
