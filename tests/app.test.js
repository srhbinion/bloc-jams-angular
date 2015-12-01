describe('Landing Controller', function(){
	var scope;
	beforeEach(module('ui.router'))
	//mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('bJams'));
	//mock the controller for the same reason and include $rootScope and $controller
	beforeEach(angular.mock.inject(function($rootScope, $controller){
	    //create an empty scope
	    scope = $rootScope.$new();
	    //declare the controller and inject our empty scope
	    $controller('LandingController', {$scope: scope});
	}));
	// tests start here
	it('should have variable text = "Turn the music up!"', function(){
	    expect(scope.welcome).toBe('Turn the music up!');
	});
});

describe('SongPlayer factory', function () {
	beforeEach(module('ui.router'))
	beforeEach(angular.mock.module('bJams'));

  it('can get an instance of my factory', inject(function(SongPlayer) {
    expect(SongPlayer).toBeDefined();
  }));
});