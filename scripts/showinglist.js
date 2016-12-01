'use strict'

app.controller('showinglistctrler', function($scope){
 $scope.showinglist = [
    {
      "theater" : "CGV Diamond",
      "film" : "Sinh vật huyền bí và nơi tìm ra chúng",
      "date" : "18/11/2016",
      "start_time": "12:00",
      "version": "2D",
      "price": "70000"
    },
    {
      "theater" : "CGV CTPlaza",
      "film" : "Sinh vật huyền bí và nơi tìm ra chúng",
      "date" : "18/11/2016",
      "start_time": "12:00",
      "version": "2D",
      "price": "70000"
    }
  ];

  $scope.theaters = [
    {
      "name" : "CGV Hoàng Văn Thụ"
    },

    {
      "name" : "CGV CTPlaza"
    },

    {
      "name" : "CGV Bitexco"
    }
  ]
});