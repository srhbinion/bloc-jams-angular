var bJams = angular.module("bJams",["ui.router"]);

bJams.controller("GalleryController", ["$scope", function($scope) {
    $scope.albumArray = {
        actionItems:[
            {
                name: "The Colors",
                artist: "Pablo Picasso",
                label: "Cubism",
                year: "1881",
                albumArtUrl: "assets/images/album_covers/01.png",
                songs: [
                    {name: "Blue", length: "4:26", audioUrl: "/assets/music/blue"},
                    {name: "Green", length: "3:14", audioUrl: "assets/music/green"},
                    {name: "Red", length: "5:01", audioUrl: "assets/music/red"},
                    {name: "Pink", length: "3:21", audioUrl: "assets/music/pink"},
                    {name: "Magenta", length: "2:15", audioUrl: "assets/music/magenta"}
                ]
            },
            {
                name: "The Telephone",
                artist: "Guglielmo Marconi",
                label: "EM",
                year: "1909",
                albumArtUrl: "assets/images/album_covers/20.png",
                songs: [
                    {name: "Hello, Operator?", length: "1:01"},
                    {name: "Ring, ring, ring", length: "5:01"},
                    {name: "Fits in your pocket", length: "3:21"},
                    {name: "Can you hear me now?", length: "3:14"},
                    {name: "Wrong phone number", length: "2:15"}
                ]
            },          
            {
                name: "The Telephone",
                artist: "Guglielmo Marconi",
                label: "EM",
                year: "1909",
                albumArtUrl: "assets/images/album_covers/20.png",
                songs: [
                    {name: "Hello, Operator?", length: "1:01"},
                    {name: "Ring, ring, ring", length: "5:01"},
                    {name: "Fits in your pocket", length: "3:21"},
                    {name: "Can you hear me now?", length: "3:14"},
                    {name: "Wrong phone number", length: "2:15"}
                ]
            },
            {
                name: "Pop Art",
                artist: "Andrew Warhol",
                label: "NYC",
                year: "1960",
                albumArtUrl: "assets/images/album_covers/22.png",
                songs: [
                    { name: "Campbell\'s Soup Cans", length: "19:62" },
                    { name: "Eight Elvises", length: "19:63" },
                    { name: "Chelsea Girls", length: "19:66" },
                    { name: "Exploding Plastic Inevitable", length: "19:62" },
                    { name: "Mao", length: "19:73" }
                ]
            }
        ]
    };  
}]);