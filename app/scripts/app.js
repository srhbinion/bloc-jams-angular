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

bJams.directive("mySlider",["SongPlayer", "$document", function(SongPlayer,$document){
    //TODO: create directive for slider
    return{
        //Specifies a URL from which the directive will load a template
        templateUrl: "templates/slider.html",
        //template replaces the directive's element
        replace: true,
        // element directive
        restrict: "E",
        //specifies that a new scope be created for the directive
        scope:{
            value:"="
        },
        //Responsible for registering DOM listeners and updating the DOM.
        link: function(scope,element,attributes){
        }
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
    };
    // play/pause controls
    $scope.changeState = function (){
        if (SongPlayer.isSongPlaying){
            SongPlayer.pause();
        }
        else {
            SongPlayer.play();
        }
    };
    $scope.playingTrackIndex = SongPlayer.currentSongIndex;
    $scope.togglePlay = $scope.playingTrackIndex === null || SongPlayer.isPaused();
    $scope.volume = 80;

    $scope.$watch('volume', function(){
        SongPlayer.setVolume($scope.volume);
    });
}]);

bJams.factory("SongPlayer", function(albumService){
	//Song status - default state
    this.currentAlbumIndex = null;
    this.currentAlbum = null;
    this.currentlyPlayingSongNumber = null;
    this.currentSongFromAlbum = null;
    this.currentSoundFile = null;
    this.currentVolume = 80;
  
    return {
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
        //TODO: Define "currentSoundFile"
        currentSongIndex: function(currentSoundFile){
            if (currentSoundFile) {
                return currentSoundFile;
            }
        },
        //TODO: Currently these only console text. Set play/pause function up to grab music
        isPaused: function(){
            //check if a song is playing and is in a paused state
            return (this.currentSoundFile && this.currentSoundFile.isSongPaused());
        },
        isPlaying: function(){
            //checks if a song is playing and not just paused.
            return (this.currentSoundFile && !this.currentSoundFile.isPaused());
        },
        setVolume: function(volume) {
          this.currentVolume = volume;
          if (currentSoundFile) {
              this.currentSoundFile.setVolume(volume);
          }
        },
        play: function(){
           if(this.isSongPaused()) {
                this.currentSoundFile.play();}
            console.log("play");
        },
		pause: function(){
//            if(this.isSongPlaying()){
//                this.currentSoundFile.pause();}
            console.log("pause");
        },
        setSong: function() {
            this.albumData = albumService.getAlbums();
            console.log(this.currentSoundFile.audioUrl); 
            //this.currentlyPlayingSongNumber = albumService[0];
            //this.currentSongFromAlbum =this.currentAlbum.songs[this.currentlyPlayingSongNumber - 1];
            //this.currentSoundFile = new buzz.sound(this.currentAlbum.audioUrl, {
            //    formats: [ "mp3" ],
            //    preload: true
            //});
            
            console.log(albumService[0]);
	    }
        /* TODO: Refactor old code below to expand this service to play music and control volume. 
        getSong: function(){
            //find out current song
            return this.getCurrentSongFromAlbum;
        },
        setSong: function(songNumber){
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
	};
});