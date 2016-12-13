'use strict'

app.controller('editfilmctrler', function($scope, $rootScope, $state, $window, AuthenticationService) {
    $scope.init = function() {
        console.log($rootScope.filmlist1);
        for (var x in $rootScope.filmlist1) {
            if ($rootScope.filmlist1[x].code === $rootScope.code) {
                console.log($rootScope.filmlist1[x]);
                document.getElementById("film").value = $rootScope.filmlist1[x].name;
                var sd = transformdate($rootScope.filmlist1[x].start_time);
                document.getElementById("start_date").value = sd;
                var ed = transformdate($rootScope.filmlist1[x].end_time);
                document.getElementById("end_date").value = ed;
                document.getElementById("type").value = $rootScope.filmlist1[x].genre;
                document.getElementById("actor").value = $rootScope.filmlist1[x].actor;
                document.getElementById("director").value = $rootScope.filmlist1[x].director;
                document.getElementById("duration").value = $rootScope.filmlist1[x].duration;
                document.getElementById("description").value = $rootScope.filmlist1[x].description;
                document.getElementById("trailer").value = $rootScope.filmlist1[x].trailer;
                document.getElementById("warning").value = $rootScope.filmlist1[x].warning;
            }
        }
    };

    
    var transformdate = function(d) {
    	var a = d.split("/");
    	var s = a[2] + "-" + a[1] + "-" + a[0];
    	return s;
    }

});
