var addNums = function (x, y){
	return x + y;
}

describe('addNums', function(){
	it('should be a function', function(){
	    expect(typeof addNums).toBe('function');
	});

	it('should be a function', function(){
	    expect(addNums(2,2)).toBe(4);
	});
});