'use strict'

app.controller('homectrler', function($scope, $rootScope, $state, $window, AuthenticationService) {

    // $scope.init = function() {
    //     $.ajax({
    //         url: _url_host + '/v1/admin/films',
    //         datatype: 'json',
    //         data: {
    //             token: $window.sessionStorage.token
    //         },
    //         type: 'GET',
    //         dataType: 'json',
    //         success: function(data, status) {

    //             var filmlist = data.data;
    //             console.log(filmlist);
    //             $rootScope.filmlist1 = [];
    //             $rootScope.filmlist2 = [];
    //             for (var x in filmlist) {
    //                 if (filmlist[x].isNowShowing === true) {
    //                     $rootScope.filmlist1.push(filmlist[x]);
    //                 } else {
    //                     $rootScope.filmlist2.push(filmlist[x]);
    //                 }
    //             }
    //             console.log($rootScope.filmlist1);
    //             console.log($rootScope.filmlist2);
    //         },
    //         error: function(data, status) {
    //             console.log(data);
    //         }
    //     });
    // };
});
