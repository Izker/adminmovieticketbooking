'use strict'

app.controller('addfilmcontroller', function($scope){
 $scope.versions = [
    {
      "type" : "2D digital"
    },
    {
      "type" : "3D"
    },
    {
      "type" : "4DX"
    }
  ];

  $scope.languages = [
    {
      "name" : "Thuyết minh tiếng Việt"
    },
    {
      "name" : "Phụ đề tiếng Việt"
    },
    {
      "name" : "Phụ đề tiếng Anh"
    }
  ];
});