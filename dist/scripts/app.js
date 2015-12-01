// Establishes AngularJS -- Named the app and set the angular function
var bJams = angular.module("bJams", ["ui.router"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
bJams.config(function($stateProvider, $locationProvider) {
	//configure an application's path
	$locationProvider.html5Mode({
        //Disables hashbangs in URL
        enabled: true,
        //avoids common $location errors
        requireBase: false
    });
	//State Provider - sets up an address for each template state
	$stateProvider
		.state("landing",{
			url: "/",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
		})
		.state("collection",{
			url: "/collection",
			controller: "CollectionController",
			templateUrl:"/templates/collection.html"
		})
		.state("album",{
			url: "/album",
			controller:"AlbumController",
			templateUrl:"/templates/album.html"
		});
});
/**
 * Controls the landing view
 * @return {welcome}  - Hero Text
 * @return {actionItems}  - Establishes the array with call-to-action containers
 */
bJams.controller("LandingController", ["$scope", "$rootScope", function($scope, $rootScope) {
	//welcome greeting in hero content
    $scope.welcome = "Turn the music up!";
    //defalut view as landing
    $rootScope.bodyClass = "landing";
    //array of information for 3 conent selling point areas
	$scope.point = {
		actionItems:[
			{
				icon: "ion-iphone",
				title: "Mobile enabled",
				description: "Listen to your music on the go. Available on all mobile platforms."
			},
			{
				icon: "ion-radio-waves",
				title: "Unlimited, streaming, ad-free",
				description: "No arbitrary limits. No distractions."
			},
			{
				icon: "ion-music-note",
				title: "Choose your music",
				description: "The world is full of music. Listen to everything."
			}
		]
	};
}]);

/**
 * Controls the Collection view
 * @return {service}  - Allows the Songplayer service to be used on this page.
 * @return {function}  - Establishes the selected album as the one that was "clicked on".
 */
bJams.controller("CollectionController", ["$scope", "SongPlayer", function($scope, SongPlayer) {
	//Defines page array details with album.js information
	$scope.albums = SongPlayer.getAlbums();
    //Tells the album view which album you want to see
    $scope.setCurrentAlbum = function(artist){
        SongPlayer.setCurrentAlbum(artist);
        $scope.artist = artist;
    };
}]);

/**
 * Controls the album view
 * @return {service}  - sets the file clicked on as the current file
 * @return {function}  - Establishes the selected album as the one that was clicked on.
 */
bJams.controller("AlbumController", ["$scope", "SongPlayer", function($scope, SongPlayer){
    //defines page array details with album information
    $scope.album = SongPlayer.getCurrentAlbum();
    //Tells the album view which album you want to see.
    $scope.setCurrentAlbum = function(artist){
        SongPlayer.setCurrentAlbum(artist);
        $scope.artist = artist;
        $scope.song = true;
        $scope.volume = 80;
    };
    $scope.onHoverSong = function(song){
        this.hoveredSong = song;
        console.log("Hovering Over: " + song.audioUrl);  
    };
    $scope.offHoverSong = function(song) {
        this.hoveredSong = null;
        console.log("Not Hovering");
    };
    $scope.playSong = function(song) {
        SongPlayer.setSong($scope.album, song);
        console.log("playSong could play this song: " + song.name);
        //$scope.getSongState();
        //SongPlayer.setSong = !SongPlayer.setSong;
    };
    $scope.pauseSong = function(song) {
        SongPlayer.isPaused();
    };
    $scope.previous = function(song) {
        SongPlayer.previous();
    };
    $scope.next = function(song) {
        SongPlayer.next();
    };
    
    //$scope.getSongState = function(song){
    //    if (song === true) {
    //        console.log("playing");
    //    } else if (song === false){
    //        console.log("just hoover");
    //    } else {
    //        console.log("Nope. Get Song State");
    //    }
    //};
}]);

bJams.directive("mySlider",["SongPlayer", "$document", function(SongPlayer,$document){
    var calculateSliderPercentFromMouseEvent = function($slider, event) {
        // Distance from left
        var offsetX =  event.pageX - $slider.offset().left; 
        // Width of slider
        var sliderWidth = $slider.width(); 
        var offsetXPercent = (offsetX  / sliderWidth);
        offsetXPercent = Math.max(0, offsetXPercent);
        offsetXPercent = Math.min(1, offsetXPercent);
        return offsetXPercent;
    };
    //TODO: create directive for slider
    return{
        //Specifies a URL from which the directive will load a template
        templateUrl: "templates/slider.html",
        //template replaces the directive's element
        replace: true,
        // element directive
        restrict: "E",
        //specifies that a new scope be created for the directive
        scope:{},
        //Responsible for registering DOM listeners and updating the DOM.
        link: function(scope,element,attributes){
            console.log("moving up");
        }
    };
}]);

bJams.factory("SongPlayer", function(albumService){
	//Song status - default state
    this.currentAlbumIndex = null;
    this.currentAlbum = null;
    this.currentlyPlayingSongNumber = null;
    //don't use?
    //this.currentSong = null;
    this.currentSoundFile = null;
    this.currentVolume = 80;
    
    //maybe delete
    this.trackIndex = function(album, song) {
     return album.songs.indexOf(song);
   };
  
    return {
        playing: false,
        // Gets data from fixtures.js to run in the service
        getAlbums: function(){
            this.albumData = albumService.getAlbums();
            var objAlbum = null;
            //for each instance in features.js factory
            for(objAlbum in this.albumData){ //name of album
                //assigning album data to this.something
                this[objAlbum] = this.albumData[objAlbum];  
            }
            //returns an array of objects
            return this.albumData;
        },
        //Gets the current album information and attaches it to the songplayer function in the controllers.
        getCurrentAlbum: function(){
            console.log(this.currentAlbum);
            return this.currentAlbum;
        },
        //Sets the album by matching the artist names. If larger group of information may want to switch to a loop statement. This function is attached to the directive in album.html
        setCurrentAlbum: function(artist){
            console.log(this.currentAlbum);
            switch (artist) {
                case "Pablo Picasso":
                    console.log ("Setting to Picasso");
                    this.currentAlbum = this.albumPicasso;
                break;
                case "Guglielmo Marconi":
                    console.log ("Setting to Marconi");
                    this.currentAlbum = this.albumMarconi;
                break;
                case "Andrew Warhol":
                    console.log ("Setting to Warhol");
                    this.currentAlbum = this.albumWarhol;
                break;
                case "BackStreet Boys":
                    console.log ("Setting to Now");
                    this.currentAlbum = this.albumNow;
                break;
                default:
                    console.log ("Is there anything else you'd like?"); 
            }
            return this.currentAlbum;
        },
        setSong: function(album, song) {
            //this.albumData = albumService.getAlbums();
            this.currentAlbum = album;
            this.currentSoundFile = song;
            this.currentSoundFile = new buzz.sound(song.audioUrl, {
                // Mp3 to start playing ASAP.
                formats: ["mp3"],
                preload: true
            }); 
            this.currentSoundFile.play().fadeIn();
            // TODO: Make it switch so only one song plays at a time
	    },
        isPlaying: function(){
            this.playing = true;
            this.currentSoundFile.play();
            console.log("play");
        },
		isPaused: function(){
            this.playing = false;
            this.currentSoundFile.stop();
            console.log("pause");
        },
        previous: function(){
            console.log("previous");
        },
        next: function(){
            console.log("next");
        },
        setVolume: function(volume) {
          this.currentVolume = volume;
          if (this.currentSoundFile) {
              this.currentSoundFile.setVolume(volume);
          }
        }
    };
});
       

        /* TODO: Refactor old code below to expand this service to play music and control volume. 

getSong: function(){
            //find out current song
            return this.getCurrentSong;
        },
setSong: function(songNumber){
            this.getCurrentlyPlayingSongNumber = songNumber;
            
            if (this.currentSoundFile){
                this.currentSoundFile.stop();
                //updateSeekBarWhileSongPlays
            }
            
            this.currentlyPlayingSongNumber = songNumber;
            
            this.currentSong = this.currentAlbum.songs[songNumber-1];

        
previousSong: function(){
            var currentSongIndex = this.currentAlbum.songs.indexOf(this.currentSong;
            var prevSongIndex = (currentSongIndex -1);
            
            if (currentSongIndex < 0){
                prevSongIndex = (this.currentAlbum.song.length - 1);
            }
            this.setSong(prevSongIndex + 1);
        },
nextSong: function(){
            var currentSongIndex = this.currentAlbum.songs.indexOf(this.currentSong);
            var nextSongIndex = (currentSongIndex + 1);
            if(nextSongIndex >= this.currentAlbum.song.length){
                nextSongIndex = 0;
            }
            this.setSong(nextSongIndex + 1);
        },
getTimePosition: function(){
            return this.currentSoundFile.getTime();
        },
setTimePosition: function(){
            if (this.currentSoundFile) {
                this.currentSoundFile.setTime();
            }
        },
getVolume: function(){
            // finds out current volume
            return this.currentVolume;
        },
setVolume: function(volume){
            //if there is a sound file it sets the volume
            this.currentVolume = volume;
            
            if (this.currentSoundFile) {
                this.currentSoundFile.setVolume(volume);
            }
        }
*/       
describe('Controller example', function(){
    beforeEach(module('bJams'));
    var LandingController,
        scope;
    beforeEach(inject(function( $rootScope, $controller){
        scope = $rootScope.$new();
        LandingController = $controller('LandingController', {
            $scope: scope
        });
    }))
    it('says welcome!', function(){
        expect(scope.welcome).toEqual("Turn the music up!");
    });
}); 
