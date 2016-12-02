"use strict";
var app = angular.module("yapp", ["ui.router", "snap", "ngAnimate"]);
app.config(["$stateProvider", "$urlRouterProvider", function(r, t) {
        t.when("/dashboard", "/dashboard/overview"), t.otherwise("/login"), r.state("base", {
                "abstract": !0,
                url: "",
                templateUrl: "views/base.html"
            })
            .state("login", {
                url: "/login",
                parent: "base",
                templateUrl: "views/login.html",
                controller: "LoginCtrl"
            })
            .state("dashboard", {
                url: "/dashboard",
                parent: "base",
                templateUrl: "views/dashboard.html",
                controller: "DashboardCtrl"
            })
            .state("home", {
                url: "/overview",
                parent: "dashboard",
                templateUrl: "views/dashboard/home.html"
            })
            .state("filmlist", {
                url: "/filmlist",
                parent: "dashboard",
                templateUrl: "views/dashboard/filmlist.html",
                controller: "filmlistctrler"
            })
            .state("showinglist", {
                url: "/showinglist",
                parent: "dashboard",
                templateUrl: "views/dashboard/showinglist.html",
                controller: "showinglistctrler"
            })
            .state("ticketpricelist", {
                url: "/ticketpricelist",
                parent: "dashboard",
                templateUrl: "views/dashboard/ticketpricelist.html",
                controller: "ticketpricelistctrler"
            })
            .state("editfilm", {
                url: "/editfilm", 
                parent: "dashboard",
                templateUrl: "views/dashboard/editfilm.html"
            })
            .state("theaterlist", {
                url: "/theaterlist",
                parent:"dashboard",
                templateUrl: "views/dashboard/theaterlist.html",
                controller: "theaterlistctrler"
            })
    }]),

    app.controller("LoginCtrl", ["$scope", "$location", function(r, t) {
        r.submit = function() {
            return t.path("/dashboard"), !1
        }
    }]), 
    
    app.controller("DashboardCtrl", ["$scope", "$state", function(r, t) {
        r.$state = t
    }]);
