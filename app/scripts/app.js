// named the app and set the angular function. Array displays what will be passes though the app.
var bJams = angular.module("bJams", ["ui.router"]);

/**
 * Configuration for the angular site views and linking the controllers
 * @param  {function} $stateProvider    - html code for displaying differnt views
 * @param  {function} $locationProvider)  - removes errors and hashbangs from address
 */
bJams.config(function($stateProvider, $locationProvider) {
	//configure an application's path
	$locationProvider.html5Mode({
        //disables hashbangs in URL - TODO: need to change to true after testing
        enabled: true,
        //avoids common $location errors
        requireBase: false
    });

	//sets up an address for each template state
	$stateProvider
		.state("landing",{
			// properties of the state
			url: "/",
			controller:"LandingController",
			templateUrl:"/templates/landing.html"
		})
		.state("collection",{
			// properties of the state
			url: "/collection",
			controller: "CollectionController",
			templateUrl:"/templates/collection.html"
		})
		.state("album",{
			// properties of the state
			url: "/album",
			controller:"AlbumController",
			templateUrl:"/templates/album.html"
		});
});
/**
 * Controller to get songs from array and store in products array till page is ready to load.
 */
bJams.controller("albumData", ["$http", function($http){
    var dataStore = this;
    dataStore.products = [];
    $http.get("/scripts/fixtures.js").success(function(data){
        dataStore.products = data;
    });
}]);
/**
 * Controls the landing view
 * @return {welcome}  - Hero Text
 * @return {actionItems}  - Establishes the array with call-to-action containers
 */
bJams.controller("LandingController", function($scope) {
	$scope.welcome = "Turn the music up!";
	//$rootScope.bodyClass ="landing";
	$scope.point = {
		actionItems:[
			{
				icon: "ion-iphone",
				title: "Mobile enabled",
				description: "Listen to your music on the go. This streaming service is available on all mobile platforms."
			},
			{
				icon: "ion-radio-waves",
				title: "Unlimited, streaming, ad-free",
				description: "No arbitrary limits. No distractions."
			},
			{
				icon: "ion-music-note",
				title: "Choose your music",
				description: "The world is full of music; why should you have to listen to music that someone else chose?"
			}
		]
	};
});

bJams.controller("CollectionController", ["$scope", "SongPlayer", function($scope, SongPlayer) {
	//defines page array details with album information
	$scope.albums = SongPlayer.getAlbums();
    //activates the slected album    
    $scope.setAlbum = function($index) {
    	SongPlayer.setCurrentAlbumIndex($index);
    };
}]);

bJams.controller("AlbumController", ["$scope", "SongPlayer", function($scope, SongPlayer) {
	$scope.album = SongPlayer.getCurrentAlbum();
    $scope.song = SongPlayer.getSong();
	//controller logic - service
    $scope.setSong = function(songNumber){
        SongPlayer.setSong(songNumber)
    };
    $scope.previousSong = function(){
        SongPlayer.previousSong();
    };
    $scope.nextSong = function(){
        SongPlayer.nextSong();
    };
	$scope.pauseSong = function(){
		SongPlayer.pauseSong();
	};
    $scope.playSong = function(){
        SongPlayer.playSong();
    };
    $scope.timeSliderPosition = function(){
        while(SongPlayer.isSongPlaying()){
            return SongPlayer.getTimePosition();
        }
    };
    $scope.setVolume = function(volume){
        SongPlayer.setVolume(volume)
    };
}]);

bJams.service("SongPlayer", ["albumData", function(albumData){
	//Song status - default state
    this.currentAlbum = null;
    this.currentlyPlayingSongNumber = null;
    this.currentSongFromAlbum = null;
    this.currentSoundFile = null;
    this.currentVolume = 80;
    
    //PlayPause Button Templates

    //Player Bar Templates
    
    return {
        getCurrentAlbum: function(){
            //get active album
            return this.currentAlbum;
        },
        getCurrentlyPlayingSongNumber: function(){
            //get the song number
            return this.currentlyPlayingSongNumber;
        },
        getCurrentSongFromAlbum: function(){
            //
            return this.currentSongFromAlbum;
        },
        isSongPaused: function(){
            //check if a song is playing and is in a paused state
            return (this.currentSoundFile && this.currentSoundFile.isSongPaused());
        },
        isSongPlaying: function(){
            //checks if a song is playing and not just paused.
            return (this.currentSoundFile && !this.currentSoundFile.isPaused());
            
        },
        getAlbums: function(){
            //get albums from array
            return albumData;
        },
        setCurrentAlbum: function(){
            // selects album
            this.currentAlbum = albumData[index];
        },
        getSong: function(){
            //find out current song
            return this.getCurrentSongFromAlbum;
        },
        setSong: function(){
            this.getCurrentlyPlayingSongNumber = songNumber;
            if (this.currentSoundFile){
                this.currentSoundFile.stop();
                //updateSeekBarWhileSongPlays
            }
            this.currentlyPlayingSongNumber = songNumber;
            this.currentSongFromAlbum = this.currentAlbum.songs[songNumber-1];
            // Assign a Buzz object. Pass audio file though current song from Album object.
            this.currentSoundFile = new buzz.sound(this.currentSongFromAlbum.audioUrl, {
                // Mp3 to start playing ASAP.
                formats: ["mp3"],
                preload: true
            });
            //volume
            this.getVolume(this.currentVolume);
        },
        previousSong: function(){
            var currentSongIndex = this.currentAlbum.songs.indexOf(this.currentSongFromAlbum);
            var prevSongIndex = (currentSongIndex -1);
            
            if (currentSongIndex < 0){
                prevSongIndex = (this.currentAlbum.song.length - 1);
            }
            this.setSong(prevSongIndex + 1);
        },
        nextSong: function(){
            var currentSongIndex = this.currentAlbum.songs.indexOf(this.currentSongFromAlbum);
            var nextSongIndex = (currentSongIndex + 1);
            if(nextSongIndex => this.currentAlbum.song.length){
                nextSongIndex = 0;
            }
            this.setSong(nextSongIndex + 1);
        },
        play: function(){
            if(this.isSongPaused()) {
                this.currentSoundFile.play();}
        },
		pause: function(){
            if(this.isSongPlaying()){
                this.currentSoundFile.pause();}
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
        setVolume: function(){
            //if there is a sound file it sets the volume
            this.currentVolume = volume;
            
            if (this.currentSoundFile) {
                this.currentSoundFile.setVolume(volume);
            }
        }
	};
}]);