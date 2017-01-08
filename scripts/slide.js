'use strict'

app.controller('addslidectrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

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

        document.getElementById('slidephoto').addEventListener('change', handleFileSelect, false);
        document.getElementById('slidephoto').disabled = true;
        auth.onAuthStateChanged(function(user) {
            if (user) {
                console.log('Anonymous user signed-in.', user);
                document.getElementById('slidephoto').disabled = false;
            } else {
                console.log('There was no anonymous session. Creating a new anonymous user.');
                // Sign the user in anonymously since accessing Storage requires the user to be authorized.
                auth.signInAnonymously();
            }
        });
    };

    $scope.addslide = function() {
        if (document.getElementById("slidetitle").value === null && document.getElementById("slidedesc").value === null && $scope.url === null) {
            alert("Nhập thông tin theo yêu cầu!!!");
        } else {

            $.ajax({
                url: _url_host + '/v1/admin/slider',
                type: 'PUT',
                dataType: 'json',
                headers: {
                    'Accept': 'application/json',
                    'x-access-token': $window.sessionStorage.token
                },
                data: {
                    "title": document.getElementById("slidetitle").value,
                    "photo": $scope.url,
                    "desc": document.getElementById("slidedesc").value
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
        }
    }



    $(document).ready(function() {
        $("#slidephoto").on('change', function() {
            //Get count of selected files
            var countFiles = $(this)[0].files.length;
            var imgPath = $(this)[0].value;
            var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
            var image_holder = $("#image-holder");
            image_holder.empty();
            if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
                if (typeof(FileReader) != "undefined") {
                    //loop for each file selected for uploaded.
                    for (var i = 0; i < countFiles; i++) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            $("<img />", {
                                "width": "600px",
                                "height": "300px",
                                "padding-left": "20px",
                                "src": e.target.result,
                                "class": "thumb-image"
                            }).appendTo(image_holder);
                            $("<br>", {
                                "src": e.target.result
                            }).appendTo(image_holder);
                            $("<br>", {
                                "src": e.target.result
                            }).appendTo(image_holder);
                        }
                        image_holder.show();
                        reader.readAsDataURL($(this)[0].files[i]);
                    }
                } else {
                    alert("Trang web không hỗ trợ chọn định dạng file này!!!");
                }
            } else {
                alert("Chỉ chọn file hình ảnh!!!");
            }
        });
    });
});
