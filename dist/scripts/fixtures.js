angular.module('bJams').factory('albumService', function($rootScope) {
    var albumService = {};
    albumService.data = {};

    albumService.getAlbums = function(){
        albumService.data = {
            albumPicasso: {
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
            albumMarconi: {
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
            albumWarhol: {
                name: "Pop Art",
                artist: "Andrew Warhol",
                label: "NYC",
                year: "1960",
                albumArtUrl: "assets/images/album_covers/22.png",
                songs: [
                    {name: "Campbell\'s Soup Cans", length: "19:62"},
                    {name: "Eight Elvises", length: "19:63"},
                    {name: "Chelsea Girls", length: "19:66"},
                    {name: "Exploding Plastic Inevitable", length: "19:62"},
                    {name: "Mao", length: "19:73"}
                ]
            },
            albumNow: {
                name: "Now Music 1",
                artist: "Misc artist",
                label: "Virgin",
                year: "1998",
                albumArtUrl: "assets/images/album_covers/23.png",
                songs: [
                    {name: "Together Again: Janet Jackson", length: "19:62", audioUrl: "/assets/music/blue"},
                    {name: "As Long As You Love Me: Backstreet Boys", length: "19:63", audioUrl: "assets/music/green"},
                    {name: "The Way: Fastball", length: "19:66", audioUrl: "assets/music/red"},
                    {name: "Flag Pole Sitta: Harvey Danger", length: "19:62", audioUrl: "assets/music/pink"},
                    {name: "Say You'll Be There: Spice Girls", length: "19:73", audioUrl: "assets/music/magenta"}
                ]
            }
        };        

        return albumService.data;
    };

    return albumService;
    
});